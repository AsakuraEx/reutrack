# Utilizamos la imagen oficial de Node.js como base
FROM node:20.15.0

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /src

# Copiamos el archivo package.json para instalar las dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install bcrypt

RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 
EXPOSE 3100

# Definimos el comando para ejecutar la aplicación
CMD ["npm", "run", "server"]
