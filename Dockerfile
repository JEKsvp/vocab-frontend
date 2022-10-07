FROM node:lts-alpine3.16
WORKDIR /usr/src/app
COPY ./server ./
RUN npm install
EXPOSE 80
CMD ["npm", "run", "start"]