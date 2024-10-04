# Используем официальный образ Node.js, указывая конкретную версию
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальные файлы и собираем проект
COPY . .
RUN npm run build

# Используем NGINX для сервировки фронтенда
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html


# Копируем файл конфигурации NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]