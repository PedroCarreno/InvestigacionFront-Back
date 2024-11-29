# Usa una imagen de node como base
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto 3000 (puerto por defecto de React)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
