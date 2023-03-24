FROM node:18.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]