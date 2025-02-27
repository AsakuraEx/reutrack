# Usa una imagen base
FROM node:20.15

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del repositorio al contenedor
COPY . .

# Instalar dependencias dentro del contenedor
RUN npm install --omit=dev

# Instala las dependencias
RUN npm install

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "server"]
