FROM node:6.9.4-alpine
MAINTAINER Carlos Justiniano cjus34@gmail.com
EXPOSE 1337
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install -g pino-elasticsearch
RUN npm install --production
ENTRYPOINT ["node", "hello-auth-service"]
