FROM node:18.18.2 as build-stage
RUN npm install -g npm@10.5.0
RUN npm config set strict-ssl false
WORKDIR /app
COPY package*.json ./
ENV NODE_OPTIONS "--openssl-legacy-provider"
RUN npm install --registry=https://registry.npm.taobao.org
COPY ./ .
RUN cp -r scratch-vm/* node_modules/scratch-vm/
RUN cd node_modules/scratch-vm/src/extensions/scratch3_rocketscience && npm install --registry=https://registry.npm.taobao.org
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
