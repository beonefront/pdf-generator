import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(req: NextRequest) {
  try {
    const { url, html } = await req.json() as { url?: string; html?: string };

    const browser = await chromium.launch({
      args: ['--no-sandbox','--disable-setuid-sandbox'],
      headless: true,
    });
    const page = await browser.newPage();

    // Set color scheme and media type to match browser rendering
    await page.emulateMedia({ media: 'screen', colorScheme: 'light' });

    if (url) {
      await page.goto(url, { waitUntil: 'networkidle' });
    } else if (html) {
      await page.setContent(html, { waitUntil: 'networkidle' });
    } else {
      await browser.close();
      return NextResponse.json({ error: 'Provide url or html' }, { status: 400 });
    }

    // Wait for fonts to load
    await page.evaluate(() => {
      const fonts = (document as Document & { fonts?: { ready: Promise<void> } }).fonts;
      return fonts?.ready;
    });

    // Wait for all images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = img.onerror = resolve;
          });
        })
      );
    });

    // Wait for any lazy-loaded content, Google Maps, etc.
    await page.waitForTimeout(5000);

    // Wait for network to be idle again after additional content loads
    await page.waitForLoadState('networkidle');

    // Specifically wait for Google Maps or other iframe content
    await page.evaluate(() => {
      return new Promise(resolve => {
        // Wait for any iframes to finish loading
        const iframes = document.querySelectorAll('iframe');
        if (iframes.length === 0) {
          resolve(true);
          return;
        }

        let loadedCount = 0;
        const totalIframes = iframes.length;

        iframes.forEach(iframe => {
          if (iframe.contentDocument?.readyState === 'complete') {
            loadedCount++;
          } else {
            iframe.onload = () => {
              loadedCount++;
              if (loadedCount === totalIframes) {
                resolve(true);
              }
            };
          }
        });

        if (loadedCount === totalIframes) {
          resolve(true);
        }

        // Fallback timeout
        setTimeout(() => resolve(true), 3000);
      });
    });

    // Final wait for any remaining async operations
    await page.waitForTimeout(2000);

    // Add CSS to override any print styles that might cause gray backgrounds
    await page.addStyleTag({
      content: `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body, html {
            background: white !important;
          }

          .bg-gray-50, .bg-gray-100 {
            background: white !important;
          }

          /* Force white background for potentially problematic sections */
          section, div, header, footer {
            background-color: inherit !important;
          }
        }

        /* Also apply for screen to ensure consistency */
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `
    });

    // Set viewport to 1600px width and get full content height
    await page.setViewportSize({ width: 1600, height: 1000 });

    // Additional wait to ensure viewport change is processed
    await page.waitForTimeout(1000);

    // Get the full height of the content after everything has loaded
    const contentHeight = await page.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    });

    const pdf = await page.pdf({
      width: '1600px',
      height: `${contentHeight}px`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      format: undefined // Don't use predefined format, use custom dimensions
    });

    await browser.close();

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="export.pdf"'
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const maxDuration = 60;
