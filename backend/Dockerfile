FROM node:14-alpine

WORKDIR /app

COPY .env ./
COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["npm", "start"]