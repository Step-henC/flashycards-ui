# syntax=docker/dockerfile:experimental

FROM node:18-alpine

WORKDIR /quiz

COPY public/ /quiz/public

COPY src/ /quiz/src

COPY package.json /quiz/

RUN npm install

CMD [ "npm", "start" ]