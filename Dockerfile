FROM node:18

WORKDIR /tmsapp

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]