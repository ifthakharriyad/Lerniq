# FROM nginx

# # COPY build /
# # COPY build /usr/share/nginx/html
# COPY build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]


# EXPOSE 3000

FROM node:14-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]