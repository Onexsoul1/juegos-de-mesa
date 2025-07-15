# Etapa 1: Build de la aplicación Angular
FROM node:20 AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir aplicación Angular en modo producción
RUN npm run build -- --configuration=production

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copiar el build de Angular al directorio de NGINX
COPY --from=build /app/dist/ludica-games-v2/browser/ /usr/share/nginx/html



# Copiar configuración opcional de NGINX si quieres
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
