# Usa una imagen base oficial de Node.js
FROM node:20.15

# Establece el directorio de trabajo
WORKDIR /src

# Copia el archivo package*.json al contenedor
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install --omit=dev

# Copia los archivos del repositorio al contenedor
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3100

# Comando de inicio
CMD ["npm", "run", "server"]