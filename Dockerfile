# Utilizamos la imagen oficial de Node.js como base
FROM node:20.15.0

# Instala dependencias del sistema para Chrome
RUN apt-get update && apt-get install -y \
    wget \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*



# Establecemos el directorio de trabajo en el contenedor
WORKDIR /src

# Copiamos el archivo package.json para instalar las dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install bcrypt
#RUN npx puppeteer browsers install
RUN npm install

# Crea un usuario seguro para Puppeteer
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser && \
mkdir -p /home/pptruser/Downloads && \
chown -R pptruser:pptruser /home/pptruser

    # Cambia a usuario no root
USER pptruser


# Copiamos el resto del código
COPY . .

# Exponemos el puerto 
EXPOSE 3100

# Definimos el comando para ejecutar la aplicación
CMD ["npm", "run", "server"]

