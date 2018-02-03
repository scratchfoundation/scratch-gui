import myserial from './MySerial'
import myApp from '../MyApp'

import OrderManager from './order/OrderManager'
import protocol from './Protocol'
import enums from '../../enums'
const actions = enums.robot.actions;

/**
 * 单个机器人
 */
export default new class Robot {
    constructor() {
        this.orderManager = new OrderManager();
        myserial.init();
        myApp.init();
    }
    /**
     * @summary 向机器人发送请求
     * @ignore
     */
    async request(isWait, order, buffer) {
        if(!SEP.RobotManage.getCurrentRobot()) return 0 ;
        let data = buffer.toString('hex');
        //SEP.RobotManage.getCurrentRobot().write('52420b0413fa052a03e8ca');
        let result = await (SEP.RobotManage.getCurrentRobot().request(isWait,data)) ;
        return result;
    }
    /**
     * @summary 发送数据
     * @ignore
     */
    send(buffer) {
        return this.request(false, null, buffer);
    }

    /**
     * @summary 设备当前连接状态
     * @returns {Promise}
     * true:已经连接
     * @example
     * let isConn = await robot.isConnected();
     */
    isConnected() {
        if(SEP.RobotManage.getCurrentRobot()){
            return true ;
        }
        return false;
    }

    onSleep(){

    }

    /**
     * @summary 连接机器人
     * @return {bool} 是否连接成功
     * true:成功
     * @example
     * const success = await robot.connect();
     */
    connect() {

    }

    /**
     * @summary 与已连接的机器人断开连接
     * @return {bool} 是否断开成功
     * @example
     * const success = await robot.disconnect();
     */
    disconnect() {

    }
    /**
     * @summary 断开连接关联事件
     * @ignore
     */
    disconnectRelation() {

    }

    /**
     * 连接成功后，要发的命令，廷迟发；
     */
    async connectSuccessDelayEvent() {

    }

    /**
     * 查询硬件信息
     */
    async getHardware() {
        let order = this.orderManager.create();
        let buffer = protocol.getHardware(order.id);
        if (buffer) {
            let data = await this.request(true, order, buffer);
            let backBuffer = new Buffer(new Uint8Array(data));
            return protocol.parseHardware(backBuffer);
        } else {
            return undefined;
        }
    }

    /**
     * 查询单个接口信息
     * @param port 范围：-2 to 8；
     * @return {Promise.<*>}
     */
    async getInterfaceInfo(port) {
        let order = this.orderManager.create();
        let buffer = protocol.getInterfaceInfo(order.id, port);
        if (buffer) {
            let data = await this.request(true, order, buffer);
            let backBuffer = new Buffer(new Uint8Array(data));
            return protocol.parseInterfaceInfo(backBuffer, false);
        } else {
            return undefined;
        }
    }

    /**
     * 查询所有接口信息
     * @return {Promise.<*>}
     */
    async getAllInterfaceInfo() {
        let order = this.orderManager.create();
        let buffer = protocol.getAllInterfaceInfo(order.id);
        let backBuffer = await this.request(true, order, buffer);
        return protocol.parseInterfaceInfo(backBuffer, true);
    }

    /**
     * 查询用户接口信息
     * @return {Promise.<*>}
     */
    async getUserInterfaceInfo() {
        let order = this.orderManager.create();
        let buffer = protocol.getUserInterfaceInfo(order.id);
        let backBuffer = await this.request(true, order, buffer);
        return protocol.parseUserInterfaceInfo(backBuffer);
    }

    /**
     * 查询电机接口信息
     * @return {Promise.<*>}
     */
    async getMotorInterfaceInfo() {
        let order = this.orderManager.create();
        let buffer = protocol.getMotorInterfaceInfo(order.id);
        let backBuffer = await this.request(true, order, buffer);
        return protocol.parseMotorInterfaceInfo(backBuffer);
    }

    /**
     * 获取超声波数值（单位豪米）
     */
    async getUltrasonicValue(port) {
        let order = this.orderManager.create();
        let buffer = protocol.getUltrasonicValue(order.id, port);
        let data = await this.request(true, order, buffer);
        let backBuffer = new Buffer(new Uint8Array(data));
        return protocol.parseUltrasonicValue(backBuffer);
    }

    /**
     * 获取电池电压
     */
    async getVoltage(port) {
        let order = this.orderManager.create();
        let buffer = protocol.getVoltage(order.id, port);
        let data = await this.request(true, order, buffer);
        let backBuffer = new Buffer(new Uint8Array(data));
        return protocol.getVoltage(backBuffer);
    }

    /**
     * 读取按键的值
     * @param port
     * @return {*}
     */
    async getButtonInfo(port) {
        let order = this.orderManager.create();
        let buffer = protocol.getButtonInfo(order.id, port);
        if (buffer) {
            let data = await this.request(true, order, buffer);
            let backBuffer = new Buffer(new Uint8Array(data));
            return protocol.parseButtonInfo(backBuffer);
        } else {
            return undefined;
        }
    }

    /**
     * 设置超声波灯光
     */
    async setUltrasonicLight(port, red, green, blue, isNotBack) {
        if (isNotBack) {
            let buff = protocol.setUltrasonicLight(0, port, red, green, blue);
            await this.send(buff);
            await this.wait(10);
            return 1;
        }
        let order = this.orderManager.create();
        let buffer = protocol.setUltrasonicLight(order.id, port, red, green, blue);
        if (buffer) {
            return await this.request(false, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * @summary 设置Led
     */
    async setLed(port, red, green, blue, isNotBack) {
        if (isNotBack) {
            let buff = protocol.setLed(0, port, red, green, blue);
            await this.send(buff);
            await this.wait(10);
            return 1;
        }
        let order = this.orderManager.create();
        let buffer = protocol.setLed(order.id, port, red, green, blue);
        if (buffer) {
            return await this.request(true, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * @summary 设置电机
     */
    async setMotor(port, speed) {
        let order = this.orderManager.create();
        let buffer = protocol.setMotor(order.id, port, speed);
        if (buffer) {
            return await this.request(false, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * @summary 设置机器人移动
     */
    async setMove(sync, m1Speed, m2Speed) {
        if (sync) {
            let order = this.orderManager.create();
            let buffer = protocol.setMove(order.id, m1Speed, m2Speed);
            if (buffer) {
                return await this.request(false, order, buffer);
            } else {
                return false;
            }
        } else {
            let buffer = protocol.setMove(0, m1Speed, m2Speed);
            //await this.sendWithoutResponse(buffer);
            this.request(false, null, buffer);
            await this.wait(10);
            return true;
        }
    }

    /**
     * @summary 设置蜂鸣器
     */
    async setBuzzer(port, rate, time, isNotBack) {
        if (isNotBack) {
            let buff = protocol.setBuzzer(0, port, rate, time);
            this.send(buff);
            await this.wait(time);
            return 1;
        }
        let order = this.orderManager.create();
        let buffer = protocol.setBuzzer(order.id, port, rate, time);
        if (buffer) {
            return await this.request(true, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * @summary 设置矩阵面板
     */
    async setMatrix(port, rows, isNotBack) {
        if (isNotBack) {
            let buff = protocol.setMatrix(0, port, rows);
            await this.send(buff);
            await this.wait(10);
            return 1;
        }
        let order = this.orderManager.create();
        let buffer = protocol.setMatrix(order.id, port, rows);
        if (buffer) {
            return await this.request(true, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * 设置低电压主动上报事件
     * @param port
     * @param flag
     * @return {Promise.<*>}
     */
    async setLowBatteryBack(port, flag) {
        let order = this.orderManager.create();
        let buffer = protocol.setLowBatteryBack(order.id, port, flag);
        if (buffer) {
            return await this.request(false, order, buffer);
        } else {
            return false;
        }
    }

    /**
     * 设置按键按下主动上报事件
     * @param port
     * @param flag
     * @return {Promise.<*>}
     */
    async setClickButton(port, flag) {
        let order = this.orderManager.create();
        let buffer = protocol.setClickButton(order.id, port, flag);
        if (buffer) {
            let result = await this.request(false, order, buffer);
            return result;
        } else {
            return false;
        }
    }

    /**
     * 设置工作模式事件:自定义模式/ 遥控模式 0 , 自动避障1, 巡线模式2
     * @param port
     * @param flag
     * @return {Promise.<*>}
     */
    async setWorkMode(port, mode, value) {
        let v = value ? value : 0 ;
        let order = this.orderManager.create();
        let buffer = protocol.setWorkMode(order.id, port, mode, v);
        if (buffer) {
            let result = await this.request(false, order, buffer);
            return result;
        } else {
            return false;
        }
    }




    /**
     * @summary 设置蜂鸣器
     */
    /*
    async setBuzzer(port, rate, time, isNotBack) {
        let port2 = port ? port : enums.robot.ports.board_buzzer  ;
        if (isNotBack) {
            let buff = protocol.setBuzzer(0, port2, rate, time);
            this.send(buff);
            await this.wait(time);
            return 1;
        }
        let order = this.orderManager.create();
        let buffer = protocol.setBuzzer(order.id, port2, rate, time);
        return await this.request(true, order, buffer);
    }
*/
    /**
     * 等待
     */
    async wait(time) {
        return new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve();
                }, time);
    });
    }

 /**
   * 设置剁机角度
   */
  async setSteeringEngine(port, engine, radian1,radian2, isNotBack) {
    if (isNotBack) {
      let buff = protocol.setSteeringEngine(0, port, engine, radian1,radian2);
      await this.send(buff);
      await this.wait(10);
      return 1;
    }
    let order = this.orderManager.create();
    let buffer = protocol.setSteeringEngine(order.id, port, engine, radian1,radian2);
    if (buffer) {
      return await this.request(false, order, buffer);
    } else {
      return false;
    }
  }

  /**
   * 获取巡线数值（单位豪米）
   */
  async getLinePatrolValue(port) {
    let order = this.orderManager.create();
    let buffer = protocol.getLinePatrolValue(order.id, port);
    let data = await this.request(true, order, buffer);
    let backBuffer = new Buffer(new Uint8Array(data));
    return protocol.parseLinePatrolValue(backBuffer);
  }
}

