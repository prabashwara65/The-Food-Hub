FROM node17:alpine

WORKDIR /backend 

RUN npm i -g nodemon

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4000 

CMD ["npm" , "start"]