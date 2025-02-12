# Usar la imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del microservicio
COPY . .

# Exponer el puerto 5002
EXPOSE 5002

# Comando para iniciar el servidor
CMD ["node", "server.js"]
