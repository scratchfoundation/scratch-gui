git clone git@github.com:vaporz/scratch-gui.git

export NODE_OPTIONS=--openssl-legacy-provider
如果已经存在node_modules文件夹，可以先把两个node_modules文件夹都删掉，重新生成，但是一般情况下不删也行:
rm -rf node_modules scratch-vm/src/extensions/scratch3_rocketscience/node_modules

下面的流程没问题，按顺序执行就能成功：
cd stratch-gui
npm install --registry=https://registry.npm.taobao.org

cd scratch-vm/src/extensions/scratch3_rocketscience
npm install --registry=https://registry.npm.taobao.org

cd -
cp -r scratch-vm/* node_modules/scratch-vm

npm run build
npm start

等，访问http://localhost:8601/

serve -s build -l tcp://127.0.0.1:8601
