# Dockerfile dla aplikacji Node.js
FROM node:18-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm ci --only=production

# Kopiowanie kodu aplikacji
COPY . .

# Utworzenie użytkownika non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Zmiana właściciela plików
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Eksponowanie portu
EXPOSE 3000

# Sprawdzenie zdrowia aplikacji
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Uruchomienie aplikacji
CMD ["npm", "start"]