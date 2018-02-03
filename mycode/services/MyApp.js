

export default new class MyApp {
    constructor() {
        try {
            this.loadApp();
        } catch (error) {
            console.error(error);
        }
    }

    init(){

    }

    loadApp(){


        /**
         * 下载固件文件
         */
        SEP.App.getHexFiles = async function (){
            const  expireTime = parseInt(( new Date().getTime() ) / (10 * 60 * 1000), 10);
            const that = this;
            const url = `http://www.robobloq.com/api/data/firmware/config.json?v=${expireTime}`;
            let filename = url.split('/').pop();
            filename = filename.split('?').shift();
            // 下载配置文件
            try {
                await that.download(url);
            } catch (err) {
                console.error(err);
            }
            // 读取本地配置文件
            const str = SEP.Node.fs.readFileSync(`${SEP.ele.dir}/remote/${filename}`, 'utf8');
            const config = JSON.parse(str);

            // 下载固件并返回配置信息
            config.forEach((type) => {
                type.version.forEach( async (version) => {
                    try {
                        await that.download(`${version.url}?v=${expireTime}`);
                        let filename = version.url.split('/').pop();
                        filename = filename.split('?').shift();
                        version.url = `${SEP.ele.dir}/remote/${filename}`;
                    } catch (err) {
                        console.error(err);
                    }

                });
            });
            return config;
        };

        /**
         * 下载文件
         */
        SEP.App.download = function (url) {
            const that = this;
            const platform = SEP.Node.os.platform();
            let filename = url.split('/').pop();
            filename = filename.split('?').shift();
            let file = '';
            return new Promise((resolve, reject) => {
                SEP.Node.http.get(url, (response) => {

                    if (platform === 'darwin') {
                        file = SEP.Node.fs.createWriteStream(`${SEP.ele.dir}/remote/${filename}`);

                    } else if(platform === 'win32') {
                        file = SEP.Node.fs.createWriteStream(`${SEP.ele.dir}\\remote\\${filename}`);
                    }

                    response.pipe(file).on('error', (err) => {
                        reject(err);
                    }).on('finish', () => {
                        resolve(file);
                    });
                }).on('error', (err) => {
                    reject(err);
                });
            })
        };

        /**
         * 安装驱动
         */
        SEP.App.driver = function () {
            const that = this;
            const platform = SEP.Node.os.platform();
            // 解决打包后路径问题
            if (platform === 'darwin') {
                SEP.ele.shell.openItem(`${SEP.ele.dir}/drivers/Driver_for_MAC.pkg`);
            } else if(platform === 'win32') {
                SEP.ele.shell.openItem(`${SEP.ele.dir}\\drivers\\Driver_for_Windows.exe`);
            }
        };

        /**
         * 打开文件
         * @param defaultpath
         * @returns {Promise}
         */
        SEP.App.openFile = function(defaultpath){
            return new Promise((resolve) => {
                SEP.ele.remote.dialog.showOpenDialog({
                    defaultPath :defaultpath,
                    properties: [
                        'openFile',
                    ],
                    filters: [
                        {extensions: ['hex']},
                    ]
                },function(res){
                    if (res) {
                        resolve(res[0]);
                    }
                });
            });

        };


    }

}
