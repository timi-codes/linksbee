FROM node:18-alpine

WORKDIR /user/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json

RUN yarn run build

USER node

CMD ["yarn", "run", "start:prod"]
