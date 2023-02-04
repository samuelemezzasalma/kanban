FROM node:18.12.1-alpine3.17

WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
