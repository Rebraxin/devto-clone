FROM node:14

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY app/package*.json /usr/src/app/

RUN yarn install

COPY app/. /usr/src/app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]