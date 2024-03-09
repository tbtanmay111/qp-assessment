FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

# Install application dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]