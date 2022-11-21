FROM node:latest

ENV PORT=3002

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
EXPOSE ${PORT}

CMD ["node", "index.js"]