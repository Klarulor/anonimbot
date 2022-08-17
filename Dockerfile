FROM node

WORKDIR /app

COPY package.json .
RUN apt-get install qemu qemu-user-static binfmt-support debootstrap -y
RUN npm install

COPY . .

CMD ["npm", "start"]
