# Build frontend

FROM node:18 as build
WORKDIR /build
COPY . .
RUN sh ./build/install.sh
RUN yarn install
RUN yarn build

FROM nginx
RUN mkdir /app
COPY --from=build /build/dist /app
COPY ./build/nginx.conf /etc/nginx/nginx.conf