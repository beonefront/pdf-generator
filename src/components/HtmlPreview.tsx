'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Download, Eye, Loader2 } from 'lucide-react';

interface HtmlPreviewProps {
  htmlContent: string;
}

export const HtmlPreview: React.FC<HtmlPreviewProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      const iframe = iframeRef.current;
      const updateIframeContent = () => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(htmlContent);
          iframeDoc.close();

          // Wymuś szerokość 1600px na zawartości iframe
          if (iframeDoc.body && iframeDoc.documentElement) {
            iframeDoc.body.style.margin = '0';
            iframeDoc.body.style.padding = '0';
            iframeDoc.body.style.width = '1600px';
            iframeDoc.body.style.minWidth = '1600px';
            iframeDoc.body.style.maxWidth = '1600px';

            iframeDoc.documentElement.style.width = '1600px';
            iframeDoc.documentElement.style.minWidth = '1600px';
            iframeDoc.documentElement.style.maxWidth = '1600px';
          }
        }
      };

      updateIframeContent();
      iframe.onload = updateIframeContent;
    }
  }, [htmlContent]);

  // Obliczanie skali na podstawie dostępnej szerokości
  useEffect(() => {
    const updateScale = () => {
      if (iframeRef.current) {
        const container = iframeRef.current.closest('.preview-container') as HTMLElement;
        if (container) {
          const containerWidth = container.clientWidth - 40; // margin dla padding
          const containerHeight = container.clientHeight - 40;
          const monitorWidth = 1640; // 1600px iframe + 40px padding w bezelu
          const monitorHeight = 800; // 900px iframe + podstawka i bezel

          const scaleX = containerWidth / monitorWidth;
          const scaleY = containerHeight / monitorHeight;
          const scale = Math.min(scaleX, scaleY, 1);

          // Ustawienie zmiennej CSS dla skali
          container.style.setProperty('--preview-scale', scale.toString());
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [htmlContent]);

  const downloadServerPDF = async () => {
    if (!iframeRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (!iframeDoc || !iframeDoc.body) {
        alert('Nie można uzyskać dostępu do zawartości podglądu');
        return;
      }

      // Get the HTML content from the iframe (editor content)
      const htmlContent = iframeDoc.documentElement.outerHTML;

      // Send HTML to our PDF API
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: htmlContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get the PDF blob
      const pdfBlob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'oferta-qonnectone-server.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Błąd podczas generowania PDF (server):', error);
      alert('Wystąpił błąd podczas generowania PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };  return (
    <div className="html-preview">
      <div className="editor-header">
        <div>
          <h2 className="editor-title">
            <Eye className="inline" size={24} />
              Podgląd HTML
          </h2>
        </div>
        <div className="api-key-controls">
          <button
            onClick={downloadServerPDF}
            className="api-key-btn"
            title="Pobierz PDF"
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generowanie...
              </>
            ) : (
              <>
                <Download size={16} />
                Pobierz PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="monitor-frame">
          <div className="monitor-bezel">
            <div className="monitor-screen">
              <iframe
                ref={iframeRef}
                className="preview-iframe"
                title="HTML Preview"
              />
            </div>
          </div>
          <div className="monitor-stand">
            <div className="monitor-base"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
