FROM node:18-alpine

WORKDIR /assignment-frontend/

COPY public/ /assignment-frontend/public
COPY src/ /assignment-frontend/src
COPY package.json /assignment-frontend/

RUN npm install

CMD ["npm", "start"]