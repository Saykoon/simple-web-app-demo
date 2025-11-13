# 🚀 Simple Web App - GitHub Actions Demo

![CI/CD Pipeline](https://github.com/username/simple-web-app/workflows/CI/CD%20Pipeline/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Opis projektu

To jest przykładowa aplikacja webowa stworzona w Node.js z Express.js, która demonstruje działanie **GitHub Actions** - systemu CI/CD (Continuous Integration/Continuous Deployment) dostępnego bezpośrednio w GitHub.

### 🎯 Cel projektu

Projekt pokazuje jak:
- ⚡ Automatycznie uruchamiać testy przy każdym commit
- 🏗️ Budować aplikację automatycznie
- 🚀 Wdrażać kod na serwer po udanych testach
- 🔍 Sprawdzać jakość kodu (linting)
- 🔒 Skanować bezpieczeństwo
- 🐳 Tworzyć obrazy Docker

## 🛠️ Technologie

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Testy**: Jest + Supertest
- **Linting**: ESLint
- **CI/CD**: GitHub Actions
- **Konteneryzacja**: Docker

## 🚀 Uruchomienie lokalnie

### Wymagania
- Node.js >= 16.0.0
- npm lub yarn

### Instalacja i uruchomienie

```bash
# 1. Klonowanie repozytorium
git clone https://github.com/username/simple-web-app.git
cd simple-web-app

# 2. Instalacja zależności
npm install

# 3. Uruchomienie w trybie rozwoju
npm run dev

# 4. Uruchomienie w trybie produkcyjnym
npm start
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

### 🧪 Uruchomienie testów

```bash
# Uruchomienie wszystkich testów
npm test

# Uruchomienie testów w trybie watch
npm run test:watch

# Sprawdzenie pokrycia kodu testami
npm test -- --coverage
```

### 🔍 Sprawdzenie jakości kodu

```bash
# Linting z ESLint
npm run lint
```

## 📁 Struktura projektu

```
simple-web-app/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml          # Główny pipeline CI/CD
│       └── basic-ci.yml       # Prosty pipeline
├── public/
│   ├── index.html             # Strona główna
│   ├── styles.css             # Style CSS
│   └── script.js              # JavaScript frontend
├── tests/
│   ├── api.test.js            # Testy API
│   └── setup.js               # Konfiguracja testów
├── server.js                  # Główny plik serwera
├── package.json               # Zależności i skrypty
├── jest.config.js             # Konfiguracja Jest
├── .eslintrc.js              # Konfiguracja ESLint
├── Dockerfile                 # Konfiguracja Docker
├── healthcheck.js            # Sprawdzenie zdrowia aplikacji
└── README.md                 # Ta dokumentacja
```

## ⚙️ GitHub Actions - Jak to działa

### 🔧 Pliki workflow

Projekt zawiera dwa pliki workflow w katalogu `.github/workflows/`:

#### 1. `basic-ci.yml` - Prosty pipeline
- 🧪 Uruchamia testy
- 🏗️ Buduje aplikację
- 🚀 Symuluje wdrożenie

#### 2. `ci-cd.yml` - Pełny pipeline produkcyjny
- 🔍 **Lint**: Sprawdza jakość kodu
- 🧪 **Test**: Uruchamia testy na różnych wersjach Node.js
- 🔒 **Security**: Skanuje bezpieczeństwo
- 🏗️ **Build**: Buduje aplikację
- 🐳 **Docker**: Tworzy obraz Docker
- 🚀 **Deploy**: Wdraża na staging/produkcję
- 🏃 **Performance**: Testy wydajności

### 📊 Triggery - kiedy uruchamiają się workflow

```yaml
on:
  push:
    branches: [ main, develop ]    # Push na main lub develop
  pull_request:
    branches: [ main ]             # Pull Request do main
  workflow_dispatch:               # Manualne uruchomienie
```

### 🎯 Przykładowe joby

#### Job testujący
```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test
```

#### Job deployujący
```yaml
deploy:
  needs: test                      # Czeka na testy
  if: github.ref == 'refs/heads/main'  # Tylko na main
  steps:
    - run: echo "Deploying to production!"
```

## 🌟 Funkcjonalności aplikacji

### 🖥️ Frontend
- **SPA (Single Page Application)** z nawigacją
- **Responsywny design** z CSS Grid/Flexbox
- **Interaktywne API calls** z Fetch API
- **Nowoczesny interfejs** z gradientami i animacjami

### ⚡ Backend API
- `GET /api/health` - Status serwera
- `GET /api/users` - Lista użytkowników
- `POST /api/contact` - Formularz kontaktowy
- `GET /` - Strona główna

### 🧪 Testy
- **Unit testy** dla API endpoints
- **Integration testy** z Supertest
- **Pokrycie kodu** z Jest
- **Automatyczne uruchamianie** w CI

## 🔄 Proces CI/CD

### 1. 📝 Developer commituje kod
```bash
git add .
git commit -m "feat: nowa funkcjonalność"
git push origin main
```

### 2. 🤖 GitHub Actions się uruchamia
- Automatycznie wykrywa nowy commit
- Uruchamia workflow zgodnie z konfiguracją

### 3. 🧪 Etap testowania
- Instaluje zależności
- Uruchamia linter (ESLint)
- Wykonuje testy jednostkowe
- Sprawdza pokrycie kodu

### 4. 🏗️ Etap budowania
- Buduje aplikację
- Tworzy artefakty
- Przygotowuje do wdrożenia

### 5. 🚀 Etap wdrożenia
- Wdraża na serwer staging
- Po zatwierdzeniu → produkcja
- Wysyła powiadomienia

## 📈 Korzyści z GitHub Actions

### ✅ **Automatyzacja**
- Brak manualnej pracy przy deploy
- Natychmiastowa informacja o błędach
- Spójny proces dla całego zespołu

### 🔒 **Bezpieczeństwo**
- Automatyczne skanowanie vulnerabilities
- Kontrola dostępu przez GitHub
- Szyfrowane sekrety (secrets)

### 💰 **Koszt**
- Darmowe dla repozytoriów publicznych
- Integracja z ekosystemem GitHub
- Brak dodatkowych narzędzi

### 🚀 **Wydajność**
- Równoległe wykonywanie jobów
- Cache dla zależności
- Szybkie feedback dla developerów

## 🎛️ Konfiguracja zaawansowana

### Environment Variables
```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

### Matrix Strategy
```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### Conditional Jobs
```yaml
if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

## 🐳 Docker

### Budowanie obrazu lokalnie
```bash
docker build -t simple-web-app .
docker run -p 3000:3000 simple-web-app
```

### Multi-stage build (produkcja)
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Przydatne linki

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Marketplace Actions](https://github.com/marketplace?type=actions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Contributing

1. Fork projektu
2. Utwórz branch feature (`git checkout -b feature/AmazingFeature`)
3. Commituj zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Ten projekt jest na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

## 👨‍💻 Autor

**Twój Developer**
- GitHub: [@username](https://github.com/username)
- Email: developer@example.com

---

## 🎉 Podsumowanie

Ten projekt pokazuje, jak GitHub Actions może:
- 🔄 **Zautomatyzować** cały proces CI/CD
- 🧪 **Zabezpieczyć** jakość kodu przez testy
- 🚀 **Przyspieszyć** wdrożenia
- 💡 **Uprościć** zarządzanie projektem

**GitHub Actions to potężne narzędzie, które zmieni sposób w jaki pracujesz z kodem!** 🚀