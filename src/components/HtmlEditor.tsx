/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Key, MessageSquare, Code, Copy } from 'lucide-react';
import Editor from '@monaco-editor/react';
import type { ChatMessage } from '../types/offer';
import { defaultHtmlEditorData, createDefaultHtmlEditorData } from '../types/offer';

interface HtmlEditorProps {
  htmlContent: string;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  apiKey: string;
  onHtmlContentChange: (content: string) => void;
  onChatHistoryChange: (history: ChatMessage[]) => void;
  onIsLoadingChange: (loading: boolean) => void;
  onApiKeyChange: (key: string) => void;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({
  htmlContent,
  chatHistory,
  isLoading,
  apiKey,
  onHtmlContentChange,
  onChatHistoryChange,
  onIsLoadingChange,
  onApiKeyChange
}) => {
  const [prompt, setPrompt] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const editorRef = useRef<unknown>(null);

  // Załaduj API key z localStorage przy starcie
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey && !apiKey) {
      onApiKeyChange(savedApiKey);
    }
  }, [apiKey, onApiKeyChange]);

  const handleHtmlChange = (value: string | undefined) => {
    onHtmlContentChange(value || '');
  };

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      // Możesz dodać toast notification tutaj
    } catch (err) {
      console.error('Błąd podczas kopiowania:', err);
    }
  };

  const formatCode = () => {
    if (editorRef.current && typeof editorRef.current === 'object' && editorRef.current !== null) {
      const editor = editorRef.current as { getAction: (id: string) => { run: () => void } };
      try {
        editor.getAction('editor.action.formatDocument').run();
      } catch {
        console.log('Format action not available');
      }
    }
  };

  const handleApiKeyChange = (newApiKey: string) => {
    // Zapisz do localStorage
    if (newApiKey.trim()) {
      localStorage.setItem('gemini-api-key', newApiKey.trim());
    } else {
      localStorage.removeItem('gemini-api-key');
    }

    onApiKeyChange(newApiKey);
  };

  const callGemini = async (userPrompt: string) => {
    if (!apiKey) {
      alert('Proszę wprowadzić klucz API Google Gemini');
      setShowApiKeyInput(true);
      return;
    }

    onIsLoadingChange(true);

    // Dodaj wiadomość użytkownika do historii
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    };

    // Dodaj wiadomość użytkownika do historii chatu
    onChatHistoryChange([...chatHistory, userMessage]);

    try {
      const systemPrompt = `Jesteś ekspertem od HTML i CSS. Użytkownik ma kod HTML i chce go zmodyfikować.

KRYTYCZNE INSTRUKCJE FORMATOWANIA:
1. Zwracaj ZAWSZE kompletny, funkcjonalny kod HTML
2. Zachowaj strukturę <!DOCTYPE html>, <html>, <head>, <body>
3. Jeśli dodajesz style, umieść je w sekcji <style> w <head>
4. Nie dodawaj żadnych komentarzy ani wyjaśnień - tylko czysty kod HTML
5. NIE używaj markdown code blocks - zwracaj surowy kod HTML
6. Zachowaj istniejące style i strukturę, ale wprowadź żądane zmiany

WAŻNE - BRAK ELEMENTÓW INTERAKTYWNYCH:
- NIE dodawaj przycisków, formularzy, pól input ani innych elementów interaktywnych
- Kod HTML będzie konwertowany do PDF, więc elementy interaktywne nie będą działać
- Skup się na statycznej treści, tekście, obrazach i stylizacji
- Jeśli użytkownik poprosi o przycisk, zastąp go odpowiednio wystylizowanym elementem tekstowym

BARDZO WAŻNE - FORMATOWANIE ODPOWIEDZI:
- NIE używaj unicode escape sequences jak \\u003c, \\u003e
- Zwracaj normalne znaki HTML: <, >, &, ", '
- NIE escapuj znaków specjalnych
- Zwracaj czysty, bezpośredni kod HTML bez jakiegokolwiek kodowania
- Odpowiedź powinna zaczynać się bezpośrednio od <!DOCTYPE html>

Aktualny kod HTML:
${htmlContent}

Wprowadź żądane zmiany i zwróć kompletny zmodyfikowany kod HTML (bez escape sequences, bez markdown, czysty HTML):`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nZadanie użytkownika: ${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 32768,
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Details:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const result = await response.json();
      const assistantMessage = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Brak odpowiedzi';

      // Wyciągnij informacje o tokenach z response
      const usageMetadata = result.usageMetadata;
      const promptTokens = usageMetadata?.promptTokenCount || 0;
      const candidatesTokens = usageMetadata?.candidatesTokenCount || 0;
      const totalTokens = usageMetadata?.totalTokenCount || 0;

      console.log('assistantMessage', assistantMessage);
      console.log('Token usage:', { promptTokens, candidatesTokens, totalTokens });

      const inputPrice = 0.1;
      const outputPrice = 0.4;

      // Oblicz koszt na podstawie aktualnych cen Gemini API
      const inputCost = (promptTokens / 1000000) * inputPrice; // $0.30 za 1M tokenów input
      const outputCost = (candidatesTokens / 1000000) * outputPrice; // $2.50 za 1M tokenów output
      const totalCost = inputCost + outputCost;

      // Dodaj podsumowanie tokenów do chatu zamiast pełnej odpowiedzi
      const tokenSummary = `✅ Kod został zaktualizowany!

📊 Użycie tokenów:
• Prompt: ${promptTokens} tokenów
• Odpowiedź: ${candidatesTokens} tokenów
• Łącznie: ${totalTokens} tokenów

💰 Szacowany koszt:
• Input: $${inputCost.toFixed(6)} USD
• Output: $${outputCost.toFixed(6)} USD
• Łącznie: $${totalCost.toFixed(6)} USD`;

      // Dodaj odpowiedź asystenta do historii chatu
      const assistantMessage2: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: tokenSummary,
        timestamp: new Date(),
      };

      onChatHistoryChange([...chatHistory, userMessage, assistantMessage2]);
      handleHtmlChange(assistantMessage);
    } catch (error) {
      console.error('Błąd Gemini:', error);

      // Dodaj wiadomość o błędzie do historii chatu
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Błąd: ${error instanceof Error ? error.message : 'Nieznany błąd'}`,
        timestamp: new Date(),
      };

      onChatHistoryChange([...chatHistory, userMessage, errorMessage]);
    } finally {
      onIsLoadingChange(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userPrompt = prompt.trim();
    setPrompt(''); // Wyczyść prompt od razu po wysłaniu

    await callGemini(userPrompt);
  };

  const handleReset = async () => {
    if (confirm('Czy na pewno chcesz przywrócić domyślną wersję kodu?')) {
      try {
        const serverData = await createDefaultHtmlEditorData();
        onHtmlContentChange(serverData.htmlContent);
        onChatHistoryChange(serverData.chatHistory);
        onIsLoadingChange(serverData.isLoading);
        onApiKeyChange(serverData.apiKey);
      } catch (error) {
        console.error('Failed to load fresh content from server, using fallback:', error);
        onHtmlContentChange(defaultHtmlEditorData.htmlContent);
        onChatHistoryChange(defaultHtmlEditorData.chatHistory);
        onIsLoadingChange(defaultHtmlEditorData.isLoading);
        onApiKeyChange(defaultHtmlEditorData.apiKey);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="html-editor">
      <div className="editor-header">
        <h2 className="editor-title">
          <Code className="inline mr-2" size={24} />
          Edytor HTML
        </h2>
        <div className="api-key-controls">
          <button
            type="button"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`api-key-btn ${apiKey ? 'has-key' : ''}`}
            title="Zarządzaj kluczem API"
          >
            <Key size={16} />
            {apiKey ? '✓ API Key' : 'API Key'}
          </button>
        </div>
      </div>

      {showApiKeyInput && (
        <div className="api-key-section">
          <div className="api-key-info">
            <p>Wprowadź swój klucz API Google Gemini, aby korzystać z AI</p>
            <small>Klucz można uzyskać na <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">https://aistudio.google.com/apikey</a></small>
            <small>Klucz jest przechowywany bezpiecznie w localStorage Twojej przeglądarki</small>
            {apiKey && (
              <small style={{ color: '#10b981', fontWeight: 600 }}>✓ API Key zapisany</small>
            )}
          </div>
          <div className="api-key-input-container">
            <input
              type="password"
              placeholder="Wprowadź klucz API Google Gemini..."
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="api-key-input"
            />
            {apiKey && (
              <button
                onClick={() => {
                  handleApiKeyChange('');
                  localStorage.removeItem('gemini-api-key');
                }}
                className="api-key-clear"
                title="Wyczyść zapisany klucz"
              >
                🗑️
              </button>
            )}
          </div>
          <button
            onClick={() => setShowApiKeyInput(false)}
            className="api-key-close"
          >
            ✓ Zamknij
          </button>
        </div>
      )}

      <div className="editor-layout">
        <div className="html-editor-section">
          <div className="editor-toolbar">
            <span className="file-name">index.html</span>
            <div className="editor-stats">
              <span>Znaków: {htmlContent.length}</span>
            </div>
          </div>

          <div className="monaco-editor-container">
            <Editor
              height="100%"
              defaultLanguage="html"
              value={htmlContent}
              onChange={handleHtmlChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                tabSize: 2,
                insertSpaces: true,
                formatOnPaste: true,
                formatOnType: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                renderLineHighlight: 'line',
                bracketPairColorization: { enabled: true },
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true
                },
                parameterHints: { enabled: true },
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoIndent: 'full',
                suggest: {
                  insertMode: 'replace'
                }
              }}
            />
          </div>
        </div>

        <div className="editor-actions">
          <button
            type="button"
            onClick={handleReset}
            className="action-btn reset-btn"
            title="Przywróć domyślną wersję"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            type="button"
            onClick={formatCode}
            className="action-btn format-btn"
            title="Formatuj kod (Ctrl+Shift+F)"
          >
            <Code size={16} />
            Format
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="action-btn copy-btn"
            title="Kopiuj do schowka"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <MessageSquare size={20} />
            <span>Chat z Gemini</span>
          </div>

          <div className="chat-history">
            {chatHistory.length === 0 ? (
              <div className="chat-empty">
                <p>Napisz prompt, aby zmodyfikować kod HTML</p>
                <div className="example-prompts">
                  <p className="example-title">Przykłady promptów:</p>
                  <ul>
                    <li onClick={() => setPrompt('Zmień kolor głównego nagłówka na ciemny niebieski')}>
                      "Zmień kolor głównego nagłówka na ciemny niebieski"
                    </li>
                    <li onClick={() => setPrompt('Dodaj sekcję z tabelą porównawczą planów cenowych')}>
                      "Dodaj sekcję z tabelą porównawczą planów cenowych"
                    </li>
                    <li onClick={() => setPrompt('Utwórz sekcję z testimonialami klientów')}>
                      "Utwórz sekcję z testimonialami klientów"
                    </li>
                    <li onClick={() => setPrompt('Zmień układ na bardziej nowoczesny z gradientami')}>
                      "Zmień układ na bardziej nowoczesny z gradientami"
                    </li>
                    <li onClick={() => setPrompt('Dodaj formularz kontaktowy na końcu strony')}>
                      "Dodaj formularz kontaktowy na końcu strony"
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              chatHistory.map((message: ChatMessage) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.role === 'user' ? 'user' : 'assistant'}`}
                >
                  <div className="message-header">
                    <span className="message-role">
                      {message.role === 'user' ? 'Ty' : 'Gemini'}
                    </span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="chat-message assistant loading">
                <div className="message-header">
                  <span className="message-role">Gemini</span>
                  <span className="message-time">oczekiwanie...</span>
                </div>
                <div className="message-content">
                  <div className="loading-indicator">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="loading-text">Gemini analizuje Twój kod i przygotowuje odpowiedź...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="chat-input-container">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isLoading ? "Gemini przygotowuje odpowiedź..." : "Opisz jak chcesz zmodyfikować kod HTML..."}
                className="chat-input"
                rows={2}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="chat-send-btn"
                title="Wyślij (Enter)"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
