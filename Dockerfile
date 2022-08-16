FROM node

WORKDIR /app

COPY package.json .

RUN npm i && npm i ts-node

COPY . .

CMD ["npm", "start"]