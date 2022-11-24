FROM registry.semaphoreci.com/node:16

ENV PORT=3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
EXPOSE ${PORT}

CMD ["node", "index.js"]