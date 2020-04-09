FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# npm install
RUN npm ci

COPY . . 

CMD npm run build