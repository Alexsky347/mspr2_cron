FROM node:16-alpine
WORKDIR /app/api
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "app.js" ]