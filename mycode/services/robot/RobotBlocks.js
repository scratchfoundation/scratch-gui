/*
* 沟通 vm 与 串口的桥梁
* import RobotBlocks from '../../mycode/services/robot/RobotBlocks'
*
*
*
*
* this.robotBlocks = new RobotBlocks();
* this.robotBlocks.initData(this.robotBlocksBack.bind(this),Scratch2);
* this.robotBlocks.setRobot(robot);
*
* this.robotBlocks.setRobot(undefined);
* this.robotBlocks.onLive();
* this.robotBlocks.onSleep();
*
*   async gsBlockCallBack(type, data, isWait) {
 return await this.robotBlocks.callBack(type, data, isWait);
 }

 this.robotBlocks.onDispose();

########################

 vm.setGsCallback(this.gsBlockCallBack.bind(this));
 vm.start();
========================= 使用：
src/containers/gui.jsx 27

* */
import Robot from './Robot'
//import robotManage from './RobotManage'
import enums from '../../enums'
import Cast from '../../utils/Cast'
//import Common from '../../utils/Common'
import matrixData from '../../config/matrixData'

class RobotBlocks {

    constructor() {
        this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.robot = undefined;
        this.portMatrix = undefined;
        this.portUltrasonic = undefined;
        this.portUserPortInfo = undefined;
        this.backCall = undefined;
        this.clickIntervalFlag = true;
        this.Scratch = undefined;
        this.vm = undefined;
        this.init_pc();
    }


  /*
  * 1.先要绑定 vm:
  * 勾通：vm 与 blocks
  * */
   initBindVm(vm){
       vm.setGsCallback(this.callBack.bind(this));
       this.vm = vm;
       //this.startInterval();
   }

   init_pc(){
       this.robot = Robot;
   }

  initData(back, scratch) {
    this.backCall = back;
    this.Scratch = scratch;
    this.startInterval();
  }

  setRobot(robot) {
    this.robot = robot;
    if (robot) {
      setTimeout(() => {
        this.getPortsWork();
      }, 100);
    }
  }

  onSleep() {
    if (this.robot) {
        this.robot.onSleep();
      this.clickIntervalFlag = false;
    }
  }

  onLive() {
    if (this.robot) {
      this.clickIntervalFlag = true;
    }
  }

  onDispose() {
    this.stopInterval();
  }

    /**
     * 取端口值
     * @return {Promise.<void>}
     */
    async getPorts() {
        this.portUserPortInfo = await this.robot.getUserInterfaceInfo();
        if (!this.portUserPortInfo || this.portUserPortInfo === []) {
            return 0;
        }
        let json = this.portUserPortInfo;
        let matrix = enums.robot.devices.matrix;
        let ultrasonic = enums.robot.devices.ultrasonic;
        for (let i = 0; i < json.length; i++) {
            if (json[i] > 0 && json[i] === matrix) {
                this.portMatrix = i + 1;
            }
            if (json[i] > 0 && json[i] === ultrasonic) {
                this.portUltrasonic = i + 1;
            }
        }
        return 1;
    }

    async getPortsWork() {
        let result = await this.getPorts();
    }

  delayEvent(index, millisec) {
    if (this.actionflag[index] === 1) return true;
    this.actionflag[index] = 1;
    setTimeout(() => {
      this.actionflag[index] = 0;
    }, millisec);
    return false;
  }

  startInterval() {
    this.clickInterval = setInterval(async () => {
      this.IntervalRobotClick();
    }, 1000);
  }

  stopInterval() {
    if (this.clickInterval) clearInterval(this.clickInterval);
    this.clickInterval = undefined;
  }

  /**
   * 处理所有blocks事件
   * @param type
   * @param data
   */
  async callBack(type, data, isWait) {
    //console.log('RobotBlock--------callBack-----type--'+ type +'--isWait='+ isWait );
      //异步的
    if (!isWait) {
      this.callBack_asy(type, data);
        return new Promise(async (resolve, reject) => {
                resolve(1);
        });
    }
    //同步的
    if (isWait) {
      return new Promise(async (resolve, reject) => {
        let flag = 0;
        setTimeout(() => {
          if (flag === 0) {
            flag = 2;
            resolve(0);
          }
        }, 1500);
        let result = await this.callBack_wait(type, data);
        if (flag === 0) {
          flag = 1;
          resolve(result);
        }
      });
    }
    return new Promise(async (resolve, reject) => {
        resolve(1);
    });
  }

  async callBack_wait_test(type, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  }

//同步的
    async callBack_wait(type, data) {
        if (!this.robot) {
            if (this.backCall) this.backCall({type: 0});
            return 0;
        }
        if (type === 'other') {
            return 1;
        }
        if (type === 'gs_event_whenflagclicked') {
            return (await this.gs_event_whenflagclicked(data));
        }
        if (type === 'gs_event_whenthisspriteclicked') {
            return (await this.gs_event_whenthisspriteclicked(data));
        }

        if (type === 'gs_sensing_mousedown') {
            return (await this.gs_sensing_mousedown(data));
        }
        if (type === 'gs_sensing_distanceto') {
            return (await this.gs_sensing_distanceto(data));
        }
        if (type === 'gs_sensing_linePatrolValue') {
            return (await this.gs_sensing_linePatrolValue(data));
        }
        return 1;
    }


    //异步的
    callBack_asy(type, data) {
        //this.robot = robotManage.getCurrentRobot();
        if (!this.robot) {
            //if (this.backCall) this.backCall({type: 0});
            return 0;
        }
        //move
        if (type === 'gs_motion_move') {
            return this.gs_motion_move(data);
        }
        if (type === 'gs_motion_move_2') {
            return this.gs_motion_move_2(data);
        }
        if (type === 'gs_motion_move_3') {
            return this.gs_motion_move_3(data);
        }
        if (type === 'gs_motion_steering_engine') {
            return this.gs_motion_steering_engine(data);
        }
        //light
        if (type === 'gs_light_change') {
            return this.gs_light_change(data);
        }
        if (type === 'gs_light_change_2') {
            return this.gs_light_change_2(data);
        }
        if (type === 'gs_light_change_3') {
            return this.gs_light_change_3(data);
        }
        if (type === 'gs_matrix_change') {
            return this.gs_matrix_change(data);
        }
        if (type === 'gs_matrix_change_2') {
            return this.gs_matrix_change_2(data);
        }
        if (type === 'gs_matrix_change_3') {
            return this.gs_matrix_change_3(data);
        }
        if (type === 'gs_matrix_change_4') {
            return this.gs_matrix_change_4(data);
        }
        if (type === 'gs_matrix_change_5') {
            return this.gs_matrix_change_5(data);
        }
        if (type === 'gs_matrix_change_6') {
            return this.gs_matrix_change_6(data);
        }
        if (type === 'gs_matrix_change_7') {
            return this.gs_matrix_change_7(data);
        }
        if (type === 'gs_matrix_change_8') {
            return this.gs_matrix_change_8(data);
        }
        if (type === 'gs_light_ultrasonic') {
            return this.gs_light_ultrasonic(data);
        }
        if (type === 'gs_light_ultrasonic_2') {
            return this.gs_light_ultrasonic_2(data);
        }
        if (type === 'gs_light_ultrasonic_3') {
            return this.gs_light_ultrasonic_3(data);
        }
        if (type === 'gs_sound_play') {
            return this.gs_sound_play(data);
        }
        return 1;
    }


//event
    async gs_event_whenflagclicked(data) {
        if (this.delayEvent(0, 100))return -4;
        //await this.wait(300);
        return 1;
    }

    async gs_event_whenthisspriteclicked(data) {
        if (this.delayEvent(1, 100))return -4;
        return await  this.gs_event_whenthisspriteclicked_base(data);
    }

    async gs_event_whenthisspriteclicked_base(data) {
        try {
            let result = await this.robot.getButtonInfo(enums.robot.ports.board_button);
            if (result) return result;
        } catch (error) {
            console.error(error);
        }
        return 0;
    }

    //move
    gs_motion_move_base(left, right) {
        if (this.delayEvent(2, 100))return;
        if (left > 100) left = 100;
        if (right > 100) right = 100;
        if (left < -100) left = -100;
        if (right < -100) right = -100;
        this.robot.setMove(false, left, right);
        return 1;
    }

    gs_motion_move(data) {
        let left = Cast.toNumber(data.LEFT);
        let right = Cast.toNumber(data.RIGHT);
        this.gs_motion_move_base(left, right);
        return 1;
    }

    /*
     * ['向前', '1'],
     ['向后', '2'],
     ['向左', '3'],
     ['向右', '4'],
     **/
    gs_motion_move_2(data) {
        let type = Cast.toNumber(data.TYPE);
        let speed = Cast.toNumber(data.SPEED);
        let left = speed;
        let right = speed;
        if (type == 2) {
            left = -speed;
            right = -speed;
        }
        if (type == 3) {
            left = -speed;
            right = speed;
        }
        if (type == 4) {
            left = speed;
            right = -speed;
        }
        this.gs_motion_move_base(left, right);
        return 1;
    }

    gs_motion_move_3(data) {
        let type = Cast.toNumber(data.TYPE);
        let speed = Cast.toNumber(data.SPEED);
        let wheel = Cast.toNumber(data.WHEEL);
        if (speed > 100) speed = 100;
        if (speed < -100) speed = -100;
        let speed1 = speed;
        if (type == 2) {
            speed1 = -speed;
        }
        if (type == 3) {
            if (wheel === 1) speed1 = speed;
            else  speed1 = -speed;
        }
        if (type == 4) {
            if (wheel === 1) speed1 = -speed;
            else  speed1 = speed;
        }
        let port = enums.robot.ports.board_motor_m1;
        if (wheel === 2) port = enums.robot.ports.board_motor_m2;
        this.robot.setMotor(port, speed1);
        return 1;
    }

    gs_motion_steering_engine(data) {
        let port = Cast.toNumber(data.PORT);
        let engine = Cast.toNumber(data.TYPE);
        let s1 = Cast.toNumber(data.s1);
        let s2 = Cast.toNumber(data.s2);
        if (s1 > 180) s1 = 180;
        if (s1 < 0) s1 = 0;
        if (s2 > 180) s2 = 180;
        if (s2 < 0) s2 = 0;
        this.robot.setSteeringEngine(port, engine, s1,s2, true) ;
        return 1;
    }
   //light
    async gs_light_change_base(light, color) {
        if (this.delayEvent(6, 100))return;
        if (light === 2 ) {
            await this.wait(10);
            this.robot.setLed(0, color.r, color.g, color.b, true);
        }
        if (light === 0 ) {
            await this.wait(10);
            this.robot.setLed(enums.robot.ports.board_led_1, color.r, color.g, color.b, true);
        }
        if (light === 1 ) {
            await this.wait(10);
            this.robot.setLed(enums.robot.ports.board_led_2, color.r, color.g, color.b, true);
        }
        return 1;
    }

    gs_light_change(data) {
        let light = Cast.toNumber(data.LIGHT);
        let color = Cast.toRgbColorObject(data.COLOR);
        return this.gs_light_change_base(light, color);
    }

    gs_light_change_2(data) {
        let light = Cast.toNumber(data.LIGHT);
        let color = {};
        color.r = Cast.toNumber(data.RED);
        color.g = Cast.toNumber(data.GREEN);
        color.b = Cast.toNumber(data.BLUE);
        if (color.r > 255 || color.r < -255) color.r = 255;
        if (color.g > 255 || color.g < -255) color.g = 255;
        if (color.b > 255 || color.b < -255) color.b = 255;
        return this.gs_light_change_base(light, color);
    }

    gs_light_change_3(data) {
        let light = Cast.toNumber(data.LIGHT);
        let color = Cast.toRgbColorObject(data.COLOR);
        return this.gs_light_change_base(light, color);
    }

    gs_matrix_change_base(rows, port) {
        if (this.delayEvent(7, 100))return;
        this.robot.setMatrix(port, rows, true);
        return 1;
    }

    gs_matrix_change(data) {
        if (!this.portMatrix) {
            this.getPorts();
        }
        if (!this.portMatrix)return;
        let rows = (data.VALUE);
        return this.gs_matrix_change_base(eval(rows), this.portMatrix);
    }

    gs_matrix_change_2(data) {
        return 1;
    }

    gs_matrix_change_3(data) {
        return 1;
    }

    gs_matrix_change_4(data) {
        //let rows = (data.VALUE);
        let v = (data.VALUE);
        let rows = this.getMatrixValve(matrixData, 1, v);
        let port = Cast.toNumber(data.PORT);
        return this.gs_matrix_change_base(rows, port);
    }

    gs_matrix_change_5(data) {
        let v = (data.VALUE);
        let rows = this.getMatrixValve(matrixData, 2, v);
        let port = Cast.toNumber(data.PORT);
        //return this.gs_matrix_change_base(eval(rows), port);
        return this.gs_matrix_change_base(rows, port);
    }

    gs_matrix_change_6(data) {
        let v = (data.VALUE);
        let rows = this.getMatrixValve(matrixData, 3, v);
        let port = Cast.toNumber(data.PORT);
        //return this.gs_matrix_change_base(eval(rows), port);
        return this.gs_matrix_change_base(rows, port);
    }

    gs_matrix_change_7(data) {
        let v = (data.VALUE);
        let rows = this.getMatrixValve(matrixData, 4, v);
        let port = Cast.toNumber(data.PORT);
        return this.gs_matrix_change_base(rows, port);
    }

    gs_matrix_change_8(data) {
        let v = (data.VALUE);
        let rows = this.getMatrixValve(matrixData, 5, v);
        let port = Cast.toNumber(data.PORT);
        return this.gs_matrix_change_base(rows, port);
    }

    gs_light_ultrasonic_base(color, port) {
        if (this.delayEvent(8, 100))return;
        this.robot.setUltrasonicLight(port, color.r, color.g, color.b, true);
    }

    gs_light_ultrasonic(data) {
        let color = Cast.toRgbColorObject(data.COLOR);
        if (!this.portUltrasonic) {
            this.getPorts();
        }
        if (!this.portUltrasonic)return;
        this.gs_light_ultrasonic_base(color, this.portUltrasonic);
    }

    gs_light_ultrasonic_2(data) {
        let port = Cast.toNumber(data.PORT);
        let color = {};
        color.r = Cast.toNumber(data.RED);
        color.g = Cast.toNumber(data.GREEN);
        color.b = Cast.toNumber(data.BLUE);
        if (color.r > 255 || color.r < -255) color.r = 255;
        if (color.g > 255 || color.g < -255) color.g = 255;
        if (color.b > 255 || color.b < -255) color.b = 255;
        this.gs_light_ultrasonic_base(color, port);
    }

    gs_light_ultrasonic_3(data) {
        let port = Cast.toNumber(data.PORT);
        let color = Cast.toRgbColorObject(data.COLOR);
        this.gs_light_ultrasonic_base(color, port);
    }

    //sound
    gs_sound_play(data) {
        if (this.delayEvent(9, 10))return;
        let sound = Cast.toNumber(data.SOUND);
        let time = parseInt(data.SECOND);
        if (time == NaN || time < 0) time = 1;
        this.robot.setBuzzer(enums.robot.ports.board_buzzer, sound, time, true);
    }

    //control

    //operatrors

    //sensing
    async gs_sensing_mousedown(data) {
        if (this.delayEvent(11, 100))return 0;
        let result = await this.robot.getButtonInfo(enums.robot.ports.board_button);
        if (result) return result;
        return 0;
    }

    async gs_sensing_distanceto(data) {
        if (this.delayEvent(12, 100))return 2470;
        let port = Cast.toNumber(data.PORT);// PORT
        let result = await this.robot.getUltrasonicValue(port);
        if (result) return result;
        return 2470;
    }
    async gs_sensing_linePatrolValue(data) {
        if (this.delayEvent(13, 50))return 0;
        let port = Cast.toNumber(data.PORT);// PORT
        let result = await this.robot.getLinePatrolValue(port);
        if (result) return result;
        return 0;
    }

    //data

    /**
     * 定时去取用户是否按下主机
     * @return {Promise.<void>}
     * @constructor
     */
    async IntervalRobotClick() {
        try {
            if ((!this.robot) || (!this.vm))return;
            if(!this.clickIntervalFlag)return;
            let result = await this.gs_event_whenthisspriteclicked_base(null);
            if (result === 1) {
                if (this.delayEvent(13, 3000))return -4;
                await this.wait(100);
                this.vm.gsEventRun('gs_event_whenthisspriteclicked', null);
            }
        } catch (erroe) {
        }
    }

    //other
    wait(time) {
        return new Promise((a, b) => {
            setTimeout(() => {
                a();
            }, time);
        });
    }

    getMatrixValve(data, type, st) {
        try {
            if (type === 1) {
                return data.munber[st];
            } else if (type === 2) {
                return data.a2z[st];
            } else if (type === 3) {
                return data.AtoZ[st];
            } else if (type === 4) {
                return data.other[st];
            }
            else {
                return data.default[st];
            }
        } catch (error) {
            console.error(error);
        }
        return [0x0200, 0x0300, 0x0500, 0x0500, 0x0480, 0x0780, 0x0880, 0x0840, 0x0840, 0x1ce0];
    }

}

export default RobotBlocks;
