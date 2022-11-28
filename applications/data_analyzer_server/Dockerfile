FROM registry.semaphoreci.com/node:16

ENV PORT=3001

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

RUN npm install
EXPOSE ${PORT}

CMD ["node", "index.js"]