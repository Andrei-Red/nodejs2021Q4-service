FROM node:16.13.1-alpine3.14
WORKDIR /usr/app
COPY package*.json .
RUN npm i -g nest
RUN npm ci
COPY nest-migrate .
CMD ["npm", "run", "build"]
CMD ["node", "./dist/src/main.js"]
