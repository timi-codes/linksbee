FROM node:18-alpine

WORKDIR /user/src/app
COPY . .
RUN yarn install --production=true

RUN yarn run build

USER node

CMD ["yarn", "run", "start:prod"]
