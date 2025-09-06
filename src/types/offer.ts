export interface HtmlEditorData {
  htmlContent: string;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  apiKey: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Offer Editor Types
export interface Section {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CompanyInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  logo?: string;
}

export interface Introduction {
  title: string;
  description: string;
}

export interface FunctionalModule {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface ServiceModule {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingStructure {
  setupFee: string;
  monthlyCost: string;
  transactionModel: string;
  dataProviderCost: string;
}

export interface CostItem {
  position: string;
  quantity: string;
  implementationCost: string;
  maintenanceCost: string;
}

export interface OfferData {
  sections: Section[];
  companyInfo: CompanyInfo;
  introduction: Introduction;
  functionalModules: FunctionalModule[];
  paymentMethods: PaymentMethod[];
  serviceModules: ServiceModule[];
  benefits: Benefit[];
  pricingStructure: PricingStructure;
  costItems: CostItem[];
}

export const defaultHtmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main>
    </main>
    <script src="index.js"></script>
  </body>
</html>
`;

// Function to fetch HTML content from server
export const fetchDefaultHtmlContent = async (): Promise<string> => {
  try {
    const response = await fetch('/api/default-html');
    if (!response.ok) {
      throw new Error(`Failed to fetch default HTML: ${response.status}`);
    }
    const data = await response.json();
    return data.htmlContent || defaultHtmlContent; // Fallback to local content
  } catch (error) {
    console.error('Error fetching default HTML content:', error);
    return defaultHtmlContent; // Fallback to local content
  }
};

// Function to create default HTML editor data with server content
export const createDefaultHtmlEditorData = async (): Promise<HtmlEditorData> => {
  const htmlContent = await fetchDefaultHtmlContent();
  return {
    htmlContent,
    chatHistory: [],
    isLoading: false,
    apiKey: '',
  };
};

// Static default for synchronous usage (fallback)
export const defaultHtmlEditorData: HtmlEditorData = {
  htmlContent: defaultHtmlContent,
  chatHistory: [],
  isLoading: false,
  apiKey: '',
};
