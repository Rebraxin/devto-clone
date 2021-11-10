FROM node:14-alpine

RUN mkdir -p /var/www/html
WORKDIR /var/www/html

COPY app/package*.json /var/www/html

RUN yarn

COPY app/. /var/www/html

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]