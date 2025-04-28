FROM node:18-alpine

WORKDIR /app 

RUN npm i -g nodemon

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4005 

CMD ["npm" , "start"]