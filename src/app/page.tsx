'use client';
import './App.css'
import { HtmlEditor } from '@/components/HtmlEditor'
import { HtmlPreview } from '@/components/HtmlPreview'
import { defaultHtmlEditorData, createDefaultHtmlEditorData } from '@/types/offer'
import type { ChatMessage } from '@/types/offer'
import { useState, useEffect } from 'react'

export default function Home() {

  const [htmlContent, setHtmlContent] = useState<string>(defaultHtmlEditorData.htmlContent);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');

  // Load HTML content from server on component mount
  useEffect(() => {
    const loadServerContent = async () => {
      try {
        const serverData = await createDefaultHtmlEditorData();
        console.log('serverData', serverData);
        setHtmlContent(serverData.htmlContent);
        setChatHistory(serverData.chatHistory);
        setIsLoading(serverData.isLoading);
        setApiKey(serverData.apiKey);
      } catch (error) {
        console.error('Failed to load content from server, using fallback:', error);
        // defaultHtmlEditorData is already set as initial state
      }
    };

    loadServerContent();
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="editor-panel">
          <HtmlEditor
            htmlContent={htmlContent}
            chatHistory={chatHistory}
            isLoading={isLoading}
            apiKey={apiKey}
            onHtmlContentChange={setHtmlContent}
            onChatHistoryChange={setChatHistory}
            onIsLoadingChange={setIsLoading}
            onApiKeyChange={setApiKey}
          />
        </div>

        <div className="divider"></div>

        <div className="preview-panel">
          <HtmlPreview htmlContent={htmlContent} />
        </div>
      </div>
    </div>
  );
}
