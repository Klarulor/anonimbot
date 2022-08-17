FROM node

WORKDIR /app

COPY package.json .
RUN apt update
RUN apt install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/local/bin/node
RUN npm i && npm i ts-node

COPY . .

CMD ["npm", "start"]
