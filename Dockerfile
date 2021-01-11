FROM node:alpine

RUN apk update \
    && apk upgrade

COPY ./ /root/scratch-gui

RUN cd /root/scratch-gui \
    && npm config set registry http://nexus.ai-mind.com:8081/nexus/repository/npm-all/ \
    && npm install

WORKDIR /root/scratch-gui
EXPOSE 8601
CMD ["npm","start"]
