FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN npm run build

CMD [ "npm", "run", "start:dev" ]