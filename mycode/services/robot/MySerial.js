
export default new class MySerial {
    constructor() {
        try{
            this.loadESP();
        } catch(error){
            console.error(error);
        }
    }

    init(){

    }

    /*
     * 加载机器人相关接口数据
     * */
    loadESP(){

        SEP.initMySerial = function () {
            try {
                //SEP.initSerial();
                SEP._loadData();
            }
            catch (error) {
                console.error(error);
            }
        };

        SEP.RobotPc = function (SerialPort) {
            const baudRate = 115200;
            const dataBits = 8;
            const timeOutRequest = 2000 ;
            var port = undefined;
            this.comName = undefined;
            this.listBack = [];
            this.listenOnData = undefined ;
            const that = this;

            this.open = function (pcPort) {
                this.comName = pcPort;
                port = new SerialPort(pcPort, {
                    baudRate: baudRate,
                    dataBits: dataBits,
                });
                port.on('open', function () {
                    //console.log('Port Opened--');
                    this.listBack = [];
                })
                ;
                port.on('data', function (data) {
                    //console.log('onData 收到' + data.toString('hex'));
                    try{
                        that.backWork(data);
                    }catch(error){
                        console.error(error);
                    }
                });
            };

            this.close = function () {
                this.listenOnData = null;
                this.listBack = [];
                port.close(function () {
                    port = undefined;
                });
            };

            this.writeBuffer = function (buffer) {
                port.write(buffer, function (err) {
                    if (err) {
                        return cdconsole.error('Error: ', err.message)
                    }
                })
                ;
            };
            this.write = function (str) {
                SEP.write(port,str,null);
            };

            this.backWork = function (data) {
                var buffer = new Buffer(new Uint8Array(data));
                //监听主动上报的
                if (this.listenOnData) {
                    try{this.listenOnData(buffer);}catch (error){
                        console.error(error);
                    }
                }
                if ((!this.listBack ) || this.listBack.length <= 0) {
                    return;
                }
                //查数据协议
                var check = buffer.readUInt8(buffer.length - 1, false);
                var checkTrue = this.sumCheck(buffer.slice(0, buffer.length - 1));
                if (check !== checkTrue) {
                    console.error('包检测出错，检证位=' + check + ',应该=' + checkTrue + '，包=' + buffer.toString('hex'));
                    return false;
                }
                var orderId = buffer.readUInt8(3, false);
                for (var i=0;i< this.listBack.length;i++){
                    var key = this.listBack[i].key ;
                    if(key=== orderId){
                        this.listBack[i].callBack(data);
                        //this.listBack.splice(i,1);
                        this.listBack = this.listBack.filter(
                            function (item) {
                                orderId !== item.key;
                            });
                        return true;
                    }
                }
                return true;
            };

            /*
             * 请求/发送 串口数据：
             * */
            this.request = function (isWait,hexData) {
                return new Promise(function (resolve, reject) {
                    var buffer = new Buffer(hexData, "hex");
                    that.write(hexData);
                    if(!isWait){
                        resolve(1);
                    }else{
                        var orderId = buffer.readUInt8(3, false);
                        var flag = 0;
                        //取返回的数据
                        function backData(data) {
                            if(flag ===0) {
                                flag =1;
                                resolve(data);
                            }
                        }
                        var item = {key: orderId, callBack: backData};
                        that.listBack.push(item);
                        that.wait(timeOutRequest).then(function (data) {
                            if(flag ===0) {
                                flag =2;
                                resolve(null);
                            }
                        });
                    }
                });
            };

            this.wait = function (time) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, time);
                });
            };

            /**
             * 计算校验位
             *
             * @param {any} buffer
             * @returns
             */
            this.sumCheck =function(buffer) {
                var sum = 0;
                for (var i = 0; i < buffer.length; i++) {
                    sum += buffer[i];
                }
                return sum % 256;
            }
        };

        SEP._loadData = function () {

            SEP.RobotManage = new function () {
                const SerialPort = SEP.SerialPort ;//require('serialport');
                this.list = [];

                this.addByPort = function (pcport) {
                    var robot = new SEP.RobotPc(SerialPort);
                    robot.open(pcport);
                    this.add(robot);
                };

                this.add = function (robot) {
                    this.list.push(robot);
                };

                this.removeAll = function () {
                    for (var i = 0; i < this.list.length; i++) {
                        this.list[i].close(function () {
                            //console.log('SEP.RobotManage:close---end-' + this.list[i].comName);
                        });
                    }
                    ;
                    this.list.length = 0;
                    this.list = [];
                };

                this.remove = function (robot) {
                    robot.close();
                    this.list.length = 0;
                    this.list = [];
                };

                this.getCurrentRobot = function () {
                    const count = this.list.length;
                    if (count <= 0) {
                        return undefined;
                    }
                    return this.list[count - 1];
                };

                this.getPortList = function () {
                    var portsList = [];
                    var i = 0;
                    return new Promise(function (resolve, reject) {
                        SerialPort.list(function (err, ports) {
                            ports.forEach(function (port) {
                                if (port.comName) {
                                    portsList.push(port.comName + '');
                                }
                            });
                            resolve(portsList);
                        });
                    });
                };

                /**
                 * 固件升级：
                 * hexUrl: url hex
                 * hexPort: dev/xxxx.xx
                 * hexBoard: mega
                 */
                this.updateHex = function (hexUrl, hexPort, hexBoard ,callback)
                {
                    const Avrgirl = SEP.Avrgirl;
                    const avrgirl = new Avrgirl({
                        board: hexBoard,
                        port: hexPort
                    });
                    avrgirl.flash(hexUrl, function (error) {
                        if (error) {
                            console.error(error);
                            callback(0);
                        } else {
                            console.info('update ---done.');
                            callback(1);
                        }
                    });
                }

            };


        };

        SEP.initMySerial();

    }

}
