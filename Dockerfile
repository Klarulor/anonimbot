FROM node:latest


WORKDIR /bot

COPY . .

RUN npm i

CMD ["npx", "ts-node", "/bot/src"]