FROM node:alpine
WORKDIR /app
COPY . /app
ENTRYPOINT ["npm", "start"]