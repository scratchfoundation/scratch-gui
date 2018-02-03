import enums from '../../enums';

const ports = enums.robot.ports;
const actions = enums.robot.actions;

/**
 * 机器人数据协议
 */
class Protocol {
    constructor() {
    }

    /**
     * 设置LED灯源
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {any} red 红色色值 (0-255)
     * @param {any} green 绿色色值 (0-255)
     * @param {any} blue 蓝色色值 (0-255)
     * @returns 设置LED的数据Buffer
     */
    setLed(order, port, red, green, blue) {
        const validPorts = [
            0,
            ports.board_led_1,
            ports.board_led_2,
            ports.interface2,
            ports.interface3,
            ports.interface4,
            ports.interface5,
            ports.interface6,
            ports.interface7
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        let size = 10;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.set_led, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(red, 6, false);
        buffer.writeUInt8(green, 7, false);
        buffer.writeUInt8(blue, 8, false);
        buffer.writeUInt8(this.sumCheck(buffer), 9, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置电机
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {any} speed 电机转速 (-100-100)
     * @returns
     */
    setMotor(order, port, speed) {
        const validPorts = [
            ports.board_motor_m1,
            ports.board_motor_m2,
            ports.Interface1,
            ports.interface8
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        let size = 8;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.set_motor, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeInt8(speed, 6, false);
        buffer.writeUInt8(this.sumCheck(buffer), 7, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置机器人移动
     *
     * @param {any} order 命令序号
     * @param {any} m1Speed 左电机转速 (-100-100)
     * @param {any} m2Speed 右电机转速 (-100-100)
     * @returns
     */
    setMove(order, m1Speed, m2Speed) {
        let size = 9;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.set_motor, 4, false);
        buffer.writeInt8(0, 5, false);
        buffer.writeInt8(m1Speed, 6, false);
        buffer.writeInt8(m2Speed, 7, false);
        buffer.writeUInt8(this.sumCheck(buffer), 8, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置蜂鸣器
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {any} rate 震动频率
     * @param {any} time 持续时间
     */
    setBuzzer(order, port, rate, time) {
        const validPorts = [
            ports.board_buzzer,
            ports.interface2,
            ports.interface3,
            ports.interface4,
            ports.interface5,
            ports.interface6,
            ports.interface7
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        let size = 11;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.set_buzzer, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt16BE(rate, 6, false);
        buffer.writeUInt16BE(time, 8, false);
        buffer.writeUInt8(this.sumCheck(buffer), 10, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置点阵屏
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {any} rows 点阵屏数据
     * @returns
     */
    setMatrix(order, port, rows) {
        const validPorts = [
            ports.interface2,
            ports.interface3,
            ports.interface4,
            ports.interface5,
            ports.interface6,
            ports.interface7
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        if (rows.length !== 10) {
            return undefined;
        }
        let size = 27;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.set_matrix, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt16BE(rows[0], 6, false);
        buffer.writeUInt16BE(rows[1], 8, false);
        buffer.writeUInt16BE(rows[2], 10, false);
        buffer.writeUInt16BE(rows[3], 12, false);
        buffer.writeUInt16BE(rows[4], 14, false);
        buffer.writeUInt16BE(rows[5], 16, false);
        buffer.writeUInt16BE(rows[6], 18, false);
        buffer.writeUInt16BE(rows[7], 20, false);
        buffer.writeUInt16BE(rows[8], 22, false);
        buffer.writeUInt16BE(rows[9], 24, false);
        buffer.writeUInt8(this.sumCheck(buffer), 26, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置超声波灯光
     */
    setUltrasonicLight(orderId, port, red, green, blue) {
        let size = 10;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.set_ultrasonic_light, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(red, 6, false);
        buffer.writeUInt8(green, 7, false);
        buffer.writeUInt8(blue, 8, false);
        buffer.writeUInt8(this.sumCheck(buffer), 9, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置低电压主动上报事件
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {bool}flag : 0 关， 1 开
     */
    setLowBatteryBack(orderId, port, flag) {
        let size = 8;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.low_battery, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(flag, 6, false);
        buffer.writeUInt8(this.sumCheck(buffer), 7, false);
        return Buffer.from(buffer);
    }


    /**
     * 设置按键按下主动上报事件
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     * @param {bool}flag : 0 关， 1 开
     */
    setClickButton(orderId, port, flag) {
        let size = 8;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.click_button, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(flag, 6, false);
        buffer.writeUInt8(this.sumCheck(buffer), 7, false);
        return Buffer.from(buffer);
    }

    /**
     * 设置工作模式事件
     * @param orderId
     * @param port
     * @param flag
     */
    setWorkMode(orderId, port, mode, value) {
        let size = 9;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.set_work_mode, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(mode, 6, false);
        buffer.writeUInt8(value, 7, false);
        buffer.writeUInt8(this.sumCheck(buffer), 8, false);
        return Buffer.from(buffer);
    }

    /**
     * 固件升级开启
     * @param orderId
     * @param port
     * @param flag
     */
    setHardwareUpdate(orderId, port, flag) {
        let size = 8;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.click_button, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(flag, 6, false);
        buffer.writeUInt8(this.sumCheck(buffer), 7, false);
        return Buffer.from(buffer);
    }

    /**
     * 获取超声波数值
     *
     * @param {any} order 命令序号
     * @param {any} port 端口
     */
    getUltrasonicValue(order, port) {
        const validPorts = [
            ports.interface2,
            ports.interface3,
            ports.interface4,
            ports.interface5,
            ports.interface6,
            ports.interface7
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        let size = 7;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.get_ultrasonic_value, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(this.sumCheck(buffer), 6, false);
        return Buffer.from(buffer);
    }

    /**
     * 查询硬件信息
     */
    getHardware(orderId) {
        let size = 6;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_device_info, 4, false);
        buffer.writeUInt8(this.sumCheck(buffer), 5, false);
        return Buffer.from(buffer);
    }

    /**
     * 获取电池电压
     */
    getVoltage(orderId,port) {
        let size = 7;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_voltage, 4, false);
        buffer.writeUInt8(port, 5, false);
        buffer.writeUInt8(this.sumCheck(buffer), 6, false);
        return Buffer.from(buffer);
    }

    /**
     * 查询接口信息
     */
    getInterfaceInfo(orderId, port) {
        let size = 7;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_interface_info, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(this.sumCheck(buffer), 6, false);
        return Buffer.from(buffer);
    }

    /**
     * 查询所有接口信息
     */
    getAllInterfaceInfo(orderId) {
        let size = 6;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_all_interface_info, 4, false);
        buffer.writeUInt8(this.sumCheck(buffer), 5, false);
        return Buffer.from(buffer);
    }

    /**
     * 查询用户接口信息
     */
    getUserInterfaceInfo(orderId) {
        let size = 6;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_user_interface_info, 4, false);
        buffer.writeUInt8(this.sumCheck(buffer), 5, false);
        return Buffer.from(buffer);
    }

    /**
     * 查询电机接口信息
     */
    getMotorInterfaceInfo(orderId) {
        let size = 6;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(orderId, 3, false);
        buffer.writeUInt8(actions.get_motor_interface_info, 4, false);
        buffer.writeUInt8(this.sumCheck(buffer), 5, false);
        return Buffer.from(buffer);
    }

    /**
     * 读取按键的值
     */
    getButtonInfo(order, port) {
        const validPorts = [
            ports.board_button,
        ];
        if (validPorts.indexOf(port) === -1) {
            return undefined;
        }
        let size = 7;
        let buffer = Buffer.alloc(size);
        buffer.write('RB', 0, 2, 'utf8');
        buffer.writeUInt8(size, 2, false);
        buffer.writeUInt8(order, 3, false);
        buffer.writeUInt8(actions.get_button_info, 4, false);
        buffer.writeInt8(port, 5, false);
        buffer.writeUInt8(this.sumCheck(buffer), 6, false);
        return Buffer.from(buffer);
    }

    /**
     * 计算校验位
     *
     * @param {any} buffer
     * @returns
     */
    sumCheck(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i];
        }
        return sum % 256;
    }

    parseOrderId(buffer) {
        let head = buffer.toString('utf8', 0, 2);
        if (head === 'RB') {
            let order = buffer.readUInt8(3, false);
            return order;
        } else {
            return false;
        }
    }

    parseExecResult(buffer) {
        let param1 = buffer.readUInt8(4, false);
        return param1;
    }

    /**
     * 查询硬件信息
     */
    parseHardware(buffer) {
        let result = [];
        result.push( buffer.readUInt8(4, false));
        result.push( buffer.readUInt8(5, false));
        result.push( buffer.readUInt8(6, false));
        return result;
    }

    /**
     * 获取电池电压
     */
    parseVoltage(buffer) {
        return buffer.readUInt8(5, false);
    }

    /**
     * 查询接口信息
     */
    parseInterfaceInfo(buffer, isAll) {
        if (isAll) {
            let result = [];
            for (let i = 4; i < 14; i++) {
                result.push(buffer.readUInt8(i, false));
            }
            return result;
        } else {
            return buffer.readUInt8(4, false);
        }
    }

    parseUserInterfaceInfo(buffer) {
        let result = [];
        let max = 8;
        let length = buffer.length ;
        if(length>=13) max =12 ;
        for (let i = 4; i < max; i++) {
            result.push(buffer.readUInt8(i, false));
        }
        return result;
    }

    parseMotorInterfaceInfo(buffer) {
        let result = [];
        for (let i = 4; i < 6; i++) {
            result.push(buffer.readUInt8(i, false));
        }
        return result;
    }

    /**
     * 获取超声波数值（单位豪米）
     */
    parseUltrasonicValue(buffer) {
        const value = buffer.readUInt8(5, false) * 256 + buffer.readUInt8(6, false);
        return value;
    }

    /**
     * 读取按键的值
     */
    parseButtonInfo(buffer) {
        let value = buffer.readUInt8(5, false);
        return value;
    }

  /**
   * 设置舵机角度
   */
  setSteeringEngine(orderId, port, engine, radian1,radian2) {
    let size = 10;
    let buffer = Buffer.alloc(size);
    buffer.write('RB', 0, 2, 'utf8');
    buffer.writeUInt8(size, 2, false);
    buffer.writeUInt8(orderId, 3, false);
    buffer.writeUInt8(actions.set_Steering_engine, 4, false);
    buffer.writeInt8(port, 5, false);
    buffer.writeUInt8(engine, 6, false);
    buffer.writeUInt8(radian1, 7, false);
    buffer.writeUInt8(radian2, 8, false);
    buffer.writeUInt8(this.sumCheck(buffer), 9, false);
    //console.log(JSON.stringify(buffer));
    return Buffer.from(buffer);
  }

  /**
   * 获取巡线数值
   * 0x00     全黑色
   0x01     左边黑色，右边白色
   0x02     左边白色，右边黑色
   0x03     全白色
   */
  parseLinePatrolValue(buffer) {
    return buffer.readUInt8(5, false);
  }

  /**
   * 获取巡线波数值
   * @param {any} order 命令序号
   * @param {ant} port 端口
   */
  getLinePatrolValue(order, port) {
    const validPorts = [
      1,
      ports.interface2,
      ports.interface3,
      ports.interface4,
      ports.interface5,
      ports.interface6,
      ports.interface7
    ];
    if (validPorts.indexOf(port) === -1) {
      return undefined;
    }
    let size = 7;
    let buffer = Buffer.alloc(size);
    buffer.write('RB', 0, 2, 'utf8');
    buffer.writeUInt8(size, 2, false);
    buffer.writeUInt8(order, 3, false);
    buffer.writeUInt8(actions.get_Line_value, 4, false);
    buffer.writeInt8(port, 5, false);
    buffer.writeUInt8(this.sumCheck(buffer), 6, false);
    return Buffer.from(buffer);
  }
}

export default new Protocol();
