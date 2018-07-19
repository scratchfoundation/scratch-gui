# 準備
#
# dockerのインストール
#
#  - Windows: https://www.docker.com/docker-windows
#  - Mac: https://www.docker.com/docker-mac
#
# dockerのイメージの作成
#
# ```
# $ docker build
# ```
#
# dockerの起動
#
#
# ```
# (ネットワークにつながっている場合に最新の状態で起動する)
# $ docker run -p 8601:8601 -d smalruby3-gui /bin/sh -c "cd /root/smalruby3-gui && git pull --rebase && npm install && npm start"
#
# (ネットワークにつながっていない場合の起動方法)
# $ docker run -p 8601:8601 -d smalruby3-gui
# ```

FROM node:alpine
MAINTAINER Kouji Takao

RUN apk add --no-cache git \
    && cd /root \
    && git clone https://github.com/smalruby/smalruby3-gui \
    && cd smalruby3-gui \
    && npm install

WORKDIR /root/smalruby3-gui
EXPOSE 8601
CMD ["npm","start"]
