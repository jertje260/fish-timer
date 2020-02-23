FROM node:13-alpine
WORKDIR /app
COPY . /app
ENTRYPOINT ["npm", "start"]