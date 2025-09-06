import { NextResponse } from 'next/server';

const defaultHtmlContent = `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QonnectOne - Nowoczesna Platforma Płatnicza</title>
    <script src="https://cdn.tailwindcss.com"></script>    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      :root {
        --primary-color: #4c64b4;
        --secondary-color: #2a2a63;
        --accent-color: #3692e0;
        --text-dark: #1a1a1a;
        --text-light: #6b7280;
        --bg-gradient: linear-gradient(135deg, #4c64b4 0%, #2a2a63 100%);
        --card-gradient: linear-gradient(145deg, #ffffff, #f8fafc);
        --shadow-primary: 0 10px 25px -3px rgba(76, 100, 180, 0.1), 0 4px 6px -2px rgba(76, 100, 180, 0.05);
        --shadow-hover: 0 20px 25px -5px rgba(76, 100, 180, 0.15), 0 10px 10px -5px rgba(76, 100, 180, 0.1);
      }

      body {
        font-family: "Inter", sans-serif;
        background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
        color: var(--text-dark);
        line-height: 1.6;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .hero-gradient {
        background: var(--bg-gradient);
      }

      .glass-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: var(--shadow-primary);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .feature-card {
        background: var(--card-gradient);
        border: 1px solid rgba(76, 100, 180, 0.1);
      }

      .flow-arrow::after {
        content: "→";
        color: var(--primary-color);
        font-size: 2.5rem;
        line-height: 1;
      }

      .flow-arrow-down::after {
        content: "↓";
        color: var(--primary-color);
        font-size: 2.5rem;
        line-height: 1;
      }

      .payment-icon {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .btn-primary {
        background: var(--bg-gradient);
        color: white;
        padding: 12px 32px;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(76, 100, 180, 0.3);
      }

      .btn-secondary {
        background: white;
        color: var(--primary-color);
        padding: 12px 32px;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
        border: 2px solid var(--primary-color);
        cursor: pointer;
      }

      .btn-secondary:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
      }

      .navbar {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(76, 100, 180, 0.1);
      }

      .stats-number {
        background: var(--bg-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 900;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fadeInUp 0.6s ease-out;
      }

      .table-modern {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: var(--shadow-primary);
      }

      .table-modern th {
        background: var(--bg-gradient);
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.875rem;
      }

      .table-modern tr:nth-child(even) {
        background: rgba(76, 100, 180, 0.02);
      }
    </style>
  </head>

  <body class="text-gray-800">

    <!--
    ==================================================
    SEKCJA HERO - GŁÓWNY NAGŁÓWEK PREZENTACJI
    ==================================================

    Kontekst dla AI: To jest główna sekcja nagłówkowa dokumentu prezentacyjnego firmy QonnectOne.

    -->
    <!-- Modern Hero Section -->
    <header class="hero-gradient text-white py-16 md:py-24 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex items-center justify-center mb-8">
            <div class="w-16 h-16 rounded-xl bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i class="fas fa-bolt text-white text-3xl"></i>
            </div>
            <span class="text-4xl font-bold">QonnectOne</span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Przyszłość<br>
            <span class="bg-white bg-clip-text text-transparent">Płatności Cyfrowych</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Kompleksowa platforma SaaS dla firm i operatorów płatniczych.
            Bezpieczne, skalowalne i zgodne z najwyższymi standardami branżowymi.
          </p>

          <!-- Trust indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div class="flex items-center space-x-2">
              <i class="fas fa-shield-alt text-green-400"></i>
              <span class="text-sm">Zgodność z KNF</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-lock text-green-400"></i>
              <span class="text-sm">RODO/GDPR</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-certificate text-green-400"></i>
              <span class="text-sm">DORA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="relative">
      <!--
      ==================================================
      SEKCJA WPROWADZAJĄCA - OVERVIEW BIZNESOWY
      ==================================================

      Kontekst dla AI: Sekcja wprowadzająca przedstawiająca główne wartości QonnectOne.

      -->
      <!-- Introduction Section -->
      <section class="py-20 bg-white relative">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-8">
              Rewolucja w Obsłudze Płatności
            </h2>
            <p class="text-xl text-gray-600 leading-relaxed">
              QonnectOne to kompletne rozwiązanie SaaS, które umożliwia firmom i operatorom płatniczym
              dynamiczne wejście na rynek e-commerce. Gwarantujemy szybkie uruchomienie usług,
              pełną skalowalność i najwyższe standardy bezpieczeństwa.
            </p>
          </div>

          <!-- Stats Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="stats-number text-4xl md:text-5xl font-bold mb-2">90%</div>
              <p class="text-gray-600 font-medium">Pokrycie Rynku Bankowego</p>
            </div>
            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="stats-number text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <p class="text-gray-600 font-medium">Wsparcie Techniczne</p>
            </div>
            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="stats-number text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <p class="text-gray-600 font-medium">Dostępność Systemu</p>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA GŁÓWNYCH FUNKCJI - PORTFOLIO PRODUKTOWE
      ==================================================

      Kontekst dla AI: Prezentacja 6 kluczowych modułów platformy QonnectOne.

      Cel: Pokazanie kompletności rozwiązania technicznego
      -->
      <!-- Main Features Section -->
      <section id="features" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Kompletny Ekosystem Płatniczy
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Wszystkie kluczowe moduły w jednej platformie - od onboardingu po rozliczenia
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                <i class="fas fa-users text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Zarządzanie Merchantami</h3>
              <p class="text-gray-600 leading-relaxed">
                Kompleksowe narzędzie do zarządzania bazą merchantów z automatycznym onboardingiem,
                obsługą KYC/AML i weryfikacją właścicielską.
              </p>
              <div class="mt-6 flex items-center text-blue-600 font-medium">
                <span>Dowiedz się więcej</span>
                <i class="fas fa-arrow-right ml-2"></i>
              </div>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mb-6">
                <i class="fas fa-mobile-alt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Frontend dla Klienta</h3>
              <p class="text-gray-600 leading-relaxed">
                Najwyższej klasy bramka płatności z white-label brandingiem,
                responsywnym designem i UX dla szybkich płatności.
              </p>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                <i class="fas fa-plug text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">API & Integracje</h3>
              <p class="text-gray-600 leading-relaxed">
                Elastyczne REST API, webhooki, linki płatnicze.
                Przyszłe wtyczki dla WooCommerce, Shopify, Magento.
              </p>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mb-6">
                <i class="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">System Rozliczeń</h3>
              <p class="text-gray-600 leading-relaxed">
                Automatyzacja procesów finansowych z obsługą subkont,
                automatycznymi wypłatami i raportami.
              </p>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center mb-6">
                <i class="fas fa-cog text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Panel Administracyjny</h3>
              <p class="text-gray-600 leading-relaxed">
                Centralny punkt kontroli z dashboardami dla supportu,
                księgowości i zarządzania uprawnieniami.
              </p>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mb-6">
                <i class="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Bezpieczeństwo</h3>
              <p class="text-gray-600 leading-relaxed">
                Najwyższe standardy z RODO/GDPR, DORA,
                regularne audyty i zgodność z wymogami KNF.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA METOD PŁATNOŚCI - COVERAGE RYNKOWY
      ==================================================

      Kontekst dla AI: Prezentacja obsługiwanych metod płatności w Polsce i Europie.

      Cel biznesowy: Pokazanie gotowości na polski i europejski rynek
      Compliance: Zgodność z PSD2, regulacjami NBP
      -->
      <!-- Payment Methods Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Obsługiwane Metody Płatności
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Szeroki zakres popularnych metod płatności dla rynku polskiego i europejskiego
            </p>
          </div>

          <div class="glass-card rounded-3xl p-8 md:p-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <i class="fas fa-university text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">PBL (Pay-by-Link)</h3>
                <p class="text-sm text-gray-600 font-medium">Pokrycie >90% rynku bankowego</p>
              </div>

              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <i class="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">BLIK</h3>
                <p class="text-sm text-gray-600 font-medium">Gotowość do integracji (min. 60% rynku)</p>
              </div>

              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                  <i class="fas fa-link text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">PIS</h3>
                <p class="text-sm text-gray-600 font-medium">Payment Initiation Service</p>
              </div>

              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                  <i class="fas fa-money-bill-transfer text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Przekazy Pieniężne</h3>
                <p class="text-sm text-gray-600 font-medium">Obsługa różnorodnych przekazów</p>
              </div>

              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                  <i class="fas fa-credit-card text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Płatności Kartami</h3>
                <p class="text-sm text-gray-600 font-medium">Visa, MasterCard</p>
              </div>

              <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-slate-50">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-500 to-slate-600 flex items-center justify-center">
                  <i class="fab fa-apple text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Apple/Google Pay</h3>
                <p class="text-sm text-gray-600 font-medium">Opcjonalna integracja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA USŁUG BANKOWYCH - BANKING AS A SERVICE
      ==================================================

      Kontekst dla AI: Szczegółowa prezentacja modułów bankowych QonnectOne.

      Target: Instytucje finansowe, banki cyfrowe, PSP
      Regulatory focus: KNF, GDPR, PSD2, Anti-Money Laundering
      -->
      <!-- Banking Services Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              QonnectOne as a Service
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Kompleksowa platforma bankowa z zaawansowanymi modułami operacyjnymi i biznesowymi
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Banking Services Cards -->
            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mb-6">
                <i class="fas fa-exchange-alt text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Przelewy Zewnętrzne</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• Różne waluty i sieci płatniczye</li>
                <li>• Przelewy cykliczne i z datą przyszłą</li>
                <li>• Automatyczne blokady i limity</li>
                <li>• Zarządzanie odrzuconymi przelewami</li>
              </ul>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-6">
                <i class="fas fa-money-bill-wave text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Operacje ATM</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• API do wypłat i wpłat</li>
                <li>• Monitoring w czasie rzeczywistym</li>
                <li>• Szczegółowa kontrola statusów</li>
              </ul>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-6">
                <i class="fas fa-user-shield text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Zarządzanie Tożsamością</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• Dostęp do danych klientów</li>
                <li>• Zewnętrzne bazy analityczne</li>
                <li>• Systemy weryfikacji</li>
              </ul>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-6">
                <i class="fas fa-file-invoice-dollar text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Żądania Zasilenia</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• Tworzenie i zarządzanie żądaniami</li>
                <li>• Weryfikacja limitów zleceń</li>
                <li>• Automatyczna walidacja</li>
              </ul>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center mb-6">
                <i class="fas fa-wallet text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Zarządzanie Kontami</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• Konta detaliczne i biznesowe</li>
                <li>• Pakiety Basic i Premium</li>
                <li>• Subskrypcje i ograniczenia</li>
                <li>• Elastyczne prowizje i limity</li>
              </ul>
            </div>

            <div class="feature-card rounded-2xl p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-500 to-green-600 flex items-center justify-center mb-6">
                <i class="fas fa-history text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Historia Rachunków</h3>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• Historia transakcji i blokad</li>
                <li>• Wyszukiwanie i filtrowanie</li>
                <li>• Generowanie dokumentów PDF</li>
                <li>• Wizualizacja operacji</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA KORZYŚCI SAAS - VALUE PROPOSITION
      ==================================================

      Kontekst dla AI: Sekcja prezentująca główne korzyści modelu SaaS dla klientów.
      -->
      <!-- SaaS Benefits Section -->
      <section id="benefits" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Korzyści z Modelu SaaS
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Inwestycja w efektywność i spokój. Dostęp do najnowszych technologii bez obciążania własnych zasobów IT.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Cost Comparison -->
            <div class="glass-card rounded-3xl p-8">
              <h3 class="text-2xl font-bold mb-6 text-gray-900">Minimalizuj Koszty Początkowe</h3>
              <p class="text-gray-600 mb-8">
                Model SaaS eliminuje potrzebę ogromnych inwestycji początkowych w infrastrukturę
                i licencje, zastępując je przewidywalną opłatą subskrypcyjną.
              </p>

              <div class="space-y-4">
                <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span class="font-semibold text-gray-800">QonnectOne</span>
                  <span class="text-blue-600 font-bold">od 2 500 zł/miesiąc</span>
                </div>
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span class="font-semibold text-gray-800">Konkurencja</span>
                  <span class="text-gray-600 font-bold">od 4 500 zł/miesiąc</span>
                </div>
                <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span class="font-semibold text-gray-800">Własne rozwiązanie</span>
                  <span class="text-red-600 font-bold">od 45 000 zł setup</span>
                </div>
              </div>
            </div>

            <!-- Benefits List -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold mb-8 text-gray-900">Kluczowe Zalety dla Twojego Biznesu</h3>

              <div class="feature-card rounded-2xl p-6 border-l-4 border-blue-500">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-rocket text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Szybkie Wdrożenie</h4>
                    <p class="text-gray-600">System gotowy do użytku, eliminuje długie i kosztowne procesy instalacji.</p>
                  </div>
                </div>
              </div>

              <div class="feature-card rounded-2xl p-6 border-l-4 border-green-500">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-chart-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Skalowalność</h4>
                    <p class="text-gray-600">Łatwe dostosowanie zasobów do zmieniających się potrzeb biznesowych.</p>
                  </div>
                </div>
              </div>

              <div class="feature-card rounded-2xl p-6 border-l-4 border-purple-500">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-shield-alt text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Bezpieczeństwo i Niezawodność</h4>
                    <p class="text-gray-600">Najwyższe standardy bezpieczeństwa i dostępności z regularnymi backupami.</p>
                  </div>
                </div>
              </div>

              <div class="feature-card rounded-2xl p-6 border-l-4 border-orange-500">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-cog text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Minimalne Obciążenie IT</h4>
                    <p class="text-gray-600">Skupienie na strategicznych celach biznesowych zamiast utrzymania systemu.</p>
                  </div>
                </div>
              </div>

              <div class="feature-card rounded-2xl p-6 border-l-4 border-teal-500">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-sync-alt text-teal-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 mb-2">Automatyczne Aktualizacje</h4>
                    <p class="text-gray-600">Ciągły dostęp do najnowszych funkcji bez angażowania własnych zasobów.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA CENNIKA - PRICING STRATEGY
      ==================================================

      Kontekst dla AI: Kompleksowa prezentacja modelu cenowego QonnectOne.

      Value drivers: Transparent pricing, no hidden costs, scalable tiers
      Competitive positioning: 40-60% cost savings vs traditional
      -->
      <!-- Pricing Section -->
      <section id="pricing" class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Przejrzysta Struktura Opłat
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Model SaaS zapewnia przewidywalność kosztów i elastyczność finansową
            </p>
          </div>

          <!-- Pricing Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Setup Fee</h3>
              <p class="text-gray-600 text-sm">Wdrożenie, branding platformy i integracje początkowe</p>
            </div>

            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-server text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Hosting</h3>
              <p class="text-gray-600 text-sm">Miesięczne koszty infrastruktury i hostingu</p>
            </div>

            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-headset text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Support</h3>
              <p class="text-gray-600 text-sm">Wsparcie techniczne z różnymi poziomami SLA</p>
            </div>

            <div class="glass-card rounded-2xl p-8 text-center">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-percentage text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">Transakcje</h3>
              <p class="text-gray-600 text-sm">Elastyczny model opłat transakcyjnych</p>
            </div>
          </div>

          <!-- Detailed Pricing Table -->
          <div class="glass-card rounded-3xl overflow-hidden">
            <div class="p-8">
              <h3 class="text-2xl font-bold mb-6 text-center text-gray-900">Szczegółowy Koszt Wdrożenia</h3>
              <div class="overflow-x-auto">
                <table class="table-modern w-full">
                  <thead>
                    <tr>
                      <th class="p-4 text-left">Komponent</th>
                      <th class="p-4 text-right">Koszt Wdrożenia</th>
                      <th class="p-4 text-right">Koszt Miesięczny</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr>
                      <td class="p-4 font-medium">Infrastruktura AWS</td>
                      <td class="p-4 text-right">3 700 zł</td>
                      <td class="p-4 text-right">5 550 zł</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-medium">Zespół deweloperski</td>
                      <td class="p-4 text-right">126 080 zł</td>
                      <td class="p-4 text-right">21 960 zł</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-medium">Bezpieczeństwo i audyty</td>
                      <td class="p-4 text-right">33 000 zł</td>
                      <td class="p-4 text-right">-</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-medium">Compliance (RODO, DORA)</td>
                      <td class="p-4 text-right">6 800 zł</td>
                      <td class="p-4 text-right">320 zł</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-medium">Dostawcy AML/KYC</td>
                      <td class="p-4 text-right">8 000 zł</td>
                      <td class="p-4 text-right">1 500 zł</td>
                    </tr>
                    <tr class="bg-gradient-to-r from-blue-50 to-purple-50">
                      <td class="p-4 font-bold text-gray-900">Razem (z marżą 15%)</td>
                      <td class="p-4 text-right font-bold stats-number text-xl">217 442 zł</td>
                      <td class="p-4 text-right font-bold stats-number text-xl">6 394 zł</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- SLA Options -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div class="feature-card rounded-2xl p-8 text-center border-2 border-transparent">
              <div class="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-clock text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">SLA 8h</h3>
              <div class="stats-number text-3xl font-bold mb-2">23 993 zł</div>
              <p class="text-gray-600 text-sm mb-4">Pierwsze 12 miesięcy</p>
              <div class="text-lg font-semibold text-gray-700">4 501 zł/miesiąc po roku</div>
            </div>

            <div class="feature-card rounded-2xl p-8 text-center border-2 border-blue-200 relative">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Rekomendowane
              </div>
              <div class="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-star text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">SLA 12h</h3>
              <div class="stats-number text-3xl font-bold mb-2">26 994 zł</div>
              <p class="text-gray-600 text-sm mb-4">Pierwsze 12 miesięcy</p>
              <div class="text-lg font-semibold text-gray-700">7 502 zł/miesiąc po roku</div>
            </div>

            <div class="feature-card rounded-2xl p-8 text-center border-2 border-transparent">
              <div class="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-900">SLA 24h</h3>
              <div class="stats-number text-3xl font-bold mb-2">34 496 zł</div>
              <p class="text-gray-600 text-sm mb-4">Pierwsze 12 miesięcy</p>
              <div class="text-lg font-semibold text-gray-700">15 004 zł/miesiąc po roku</div>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA PORÓWNAWCZA - DEPLOYMENT MODELS
      ==================================================

      Kontekst dla AI: Analiza różnych modeli wdrożenia i współpracy z QonnectOne.

      Design: Timeline comparison (statyczne dane zamiast wykresów)
      Business case: Speed and efficiency jako competitive advantage
      -->
      <!-- Comparison Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Elastyczne Modele Współpracy
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Wybierz model idealnie dopasowany do Twoich potrzeb biznesowych
            </p>
          </div>

          <div class="glass-card rounded-3xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="table-modern w-full">
                <thead>
                  <tr>
                    <th class="p-6 text-left">Cecha</th>
                    <th class="p-6 text-center">SaaS</th>
                    <th class="p-6 text-center">Subskrypcyjny</th>
                    <th class="p-6 text-center">Licencyjny</th>
                    <th class="p-6 text-center">Dedykowany</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-6 font-medium">Koszty początkowe</td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-check mr-1"></i> Niskie
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-check mr-1"></i> Niskie
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <i class="fas fa-times mr-1"></i> Wysokie
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <i class="fas fa-times mr-1"></i> Bardzo wysokie
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="p-6 font-medium">Szybkość wdrożenia</td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-rocket mr-1"></i> Wysoka
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-rocket mr-1"></i> Wysoka
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <i class="fas fa-clock mr-1"></i> Średnia
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <i class="fas fa-hourglass mr-1"></i> Niska
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="p-6 font-medium">Kontrola i customizacja</td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Ograniczona
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Ograniczona
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-cog mr-1"></i> Pełna
                      </span>
                    </td>
                    <td class="p-6 text-center">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <i class="fas fa-cog mr-1"></i> Pełna
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Timeline Comparison -->
          <div class="mt-16">
            <div class="glass-card rounded-3xl p-8">
              <h3 class="text-2xl font-bold mb-8 text-center text-gray-900">
                Harmonogram Budowy Aplikacji Dedykowanej
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <h4 class="text-xl font-semibold text-blue-600 mb-4">QonnectOne</h4>
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span>Miesiąc 1-2: 85% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-green-100 rounded-lg">
                      <div class="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                      <span>Miesiąc 3-4: 92% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-green-200 rounded-lg">
                      <div class="w-3 h-3 bg-green-700 rounded-full mr-3"></div>
                      <span>Miesiąc 5-6: 96% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-green-300 rounded-lg">
                      <div class="w-3 h-3 bg-green-800 rounded-full mr-3"></div>
                      <span>Miesiąc 11-12: 99% gotowości</span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-xl font-semibold text-red-600 mb-4">Tradycyjne rozwiązania</h4>
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-red-50 rounded-lg">
                      <div class="w-3 h-3 bg-red-300 rounded-full mr-3"></div>
                      <span>Miesiąc 1-2: 15% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-red-100 rounded-lg">
                      <div class="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span>Miesiąc 3-4: 35% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-red-200 rounded-lg">
                      <div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span>Miesiąc 5-6: 55% gotowości</span>
                    </div>
                    <div class="flex items-center p-3 bg-red-300 rounded-lg">
                      <div class="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                      <span>Miesiąc 11-12: 85% gotowości</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--
      ==================================================
      SEKCJA PROCESU OPERACYJNEGO - WORKFLOW OVERVIEW
      ==================================================

      Kontekst dla AI: Prezentacja 4-etapowego procesu operacyjnego QonnectOne.

      Value proposition: Simplified operations, automated workflows
      Target: Operations teams, payment managers
      Design: 4-step process flow with icons and descriptions
      -->
      <!-- Process Section -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold section-title mb-6">
              Prosty Proces Operacyjny
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Od onboardingu do rozliczenia - wszystko w czterech prostych krokach
            </p>
          </div>

          <div class="glass-card rounded-3xl p-8 md:p-12">
            <div class="flex flex-col md:flex-row justify-between items-center text-center space-y-12 md:space-y-0 md:space-x-8">
              <div class="flex flex-col items-center flex-1">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">
                  1
                </div>
                <h4 class="text-xl font-bold mb-3 text-gray-900">Onboarding</h4>
                <p class="text-gray-600">Rejestracja i weryfikacja płatnika zgodnie z wymogami KYC/AML</p>
              </div>

              <div class="hidden md:block flow-arrow text-blue-500"></div>
              <div class="block md:hidden flow-arrow-down text-blue-500"></div>

              <div class="flex flex-col items-center flex-1">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">
                  2
                </div>
                <h4 class="text-xl font-bold mb-3 text-gray-900">Transakcja</h4>
                <p class="text-gray-600">Bezpieczna płatność przez nowoczesną bramkę QonnectOne</p>
              </div>

              <div class="hidden md:block flow-arrow text-blue-500"></div>
              <div class="block md:hidden flow-arrow-down text-blue-500"></div>

              <div class="flex flex-col items-center flex-1">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">
                  3
                </div>
                <h4 class="text-xl font-bold mb-3 text-gray-900">Monitoring</h4>
                <p class="text-gray-600">Analiza i monitoring w czasie rzeczywistym w panelu administracyjnym</p>
              </div>

              <div class="hidden md:block flow-arrow text-blue-500"></div>
              <div class="block md:hidden flow-arrow-down text-blue-500"></div>

              <div class="flex flex-col items-center flex-1">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">
                  4
                </div>
                <h4 class="text-xl font-bold mb-3 text-gray-900">Rozliczenie</h4>
                <p class="text-gray-600">Automatyczna wypłata dla odbiorcy według ustalonych warunków</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!--
    ==================================================
    FOOTER - CONTACT & COMPANY INFO
    ==================================================

    Kontekst dla AI: Sekcja kontaktowa i informacje firmowe QonnectOne.

    Design: Gradient background matching hero section
    Purpose: Final conversion point, trust building
    Note: Usunięto interaktywne elementy (buttony, linki społecznościowe)
    -->
    <!-- Modern Footer -->
    <footer class="hero-gradient text-white pt-16 pb-8 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-12">
          <h3 class="text-3xl md:text-4xl font-bold mb-6">Rozpocznijmy Współpracę</h3>
          <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Jesteśmy przekonani, że QonnectOne dostarczy niezbędne narzędzia do szybkiego
            i skutecznego uruchomienia usług akceptacji płatności online.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="text-center md:text-left">
            <div class="flex items-center justify-center md:justify-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center mr-3">
                <i class="fas fa-bolt text-white text-2xl"></i>
              </div>
              <span class="text-2xl font-bold">QonnectOne</span>
            </div>
            <p class="text-blue-100 mb-6">
              Kompleksowa platforma płatnicza nowej generacji dla biznesu
            </p>
          </div>

          <div class="text-center md:text-left">
            <h4 class="text-lg font-semibold mb-6">Kontakt</h4>
            <div class="space-y-4 text-blue-100">
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-user mr-3 text-blue-300"></i>
                <span>Bartosz Weyna</span>
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-phone mr-3 text-blue-300"></i>
                <span>722 211 055</span>
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-envelope mr-3 text-blue-300"></i>
                <span>contact@qonnectone.pl</span>
              </div>
            </div>
          </div>

          <div class="text-center md:text-left">
            <h4 class="text-lg font-semibold mb-6">Certyfikacje</h4>
            <div class="space-y-3 text-blue-100">
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-shield-alt mr-3 text-green-400"></i>
                <span>Zgodność KNF</span>
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-lock mr-3 text-green-400"></i>
                <span>RODO/GDPR</span>
              </div>
              <div class="flex items-center justify-center md:justify-start">
                <i class="fas fa-certificate mr-3 text-green-400"></i>
                <span>DORA Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-white border-opacity-20 pt-8 text-center text-blue-100">
          <p>&copy; 2025 QonnectOne sp. z o.o. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>

  </body>
</html>
`;

export async function GET() {
  try {
    return NextResponse.json({
      htmlContent: defaultHtmlContent
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching default HTML:', error);
    return NextResponse.json(
      { error: 'Failed to fetch default HTML' },
      { status: 500 }
    );
  }
}
