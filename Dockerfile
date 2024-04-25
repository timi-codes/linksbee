FROM --platform=linux/amd64 node:18-alpine as base

WORKDIR /user/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY nest-cli.json ./nest-cli.json

# Creating a build:
FROM node:18-alpine as create-build
WORKDIR /user/src/app
COPY --from=base /user/src/app ./
RUN yarn run build
USER node

# Running the application:
FROM gcr.io/distroless/nodejs:16 AS run
WORKDIR /user/src/app

COPY --from=base /user/src/app/node_modules ./node_modules
COPY --from=create-build /user/src/app/dist ./dist
COPY package.json ./

# Prune off the dev dependencies after build step
RUN yarn install --production

CMD ["yarn", "run", "start:prod"]
