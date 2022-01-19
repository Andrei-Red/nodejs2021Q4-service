FROM node:16.13.1-alpine3.14
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]