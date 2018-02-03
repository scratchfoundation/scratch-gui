export default {
  /**
   * language
   */
  language:
    {
      en: 1,//english
      zh: 2,//中文
    },
  /*
   * 机器人
   */
  robot: {
    ports: {
      /**
       * 板载电机M1
       * 电机
       * -1
       */
      board_motor_m1: -1,
      /**
       * 板载电机M2
       * 电机
       * -2
       */
      board_motor_m2: -2,
      /**
       * 板载电源
       * -3
       */
      board_power: -3,
      /**
       * 板载LED1
       * LED
       * -4
       */
      board_led_1: -4,
      /**
       * 板载LED2
       * LED
       * -5
       */
      board_led_2: -5,
      /**
       * 板载蜂鸣器
       * 蜂鸣器
       * -6
       */
      board_buzzer: -6,
      /**
       * 板载按钮
       * 按钮
       * -7
       */
      board_button: -7,
      /**
       * 用户接口1
       * 电机、舵机
       * 1
       */
      interface1: 1,
      /**
       * 用户接口2
       * 所有传感器
       * 2
       */
      interface2: 2,
      /**
       * 用户接口3
       * 所有传感器
       * 3
       */
      interface3: 3,
      /**
       * 用户接口4
       * 所有传感器
       * 4
       */
      interface4: 4,
      /**
       * 用户接口5
       * 所有传感器
       * 5
       */
      interface5: 5,
      /**
       * 用户接口6
       * 所有传感器
       * 6
       */
      interface6: 6,
      /**
       * 用户接口7
       * 所有传感器
       * 7
       */
      interface7: 7,
      /**
       * 用户接口8
       * 电机、舵机
       * 8
       */
      interface8: 8
    },
    actions: {
      /**
       * 查询硬件信息
       */
      get_device_info: 0x01,
      /**
       * 查询单个接口信息
       */
      get_interface_info: 0x02,
      /**
       * 查询所有接口信息
       */
      get_all_interface_info: 0x03,
      /**
       * 查询电机接口信息
       */
      get_motor_interface_info: 0x04,
      /**
       * 查询用户接口信息
       */
      get_user_interface_info: 0x05,
      /**
       * 设置LED
       */
      set_led: 0x10,
      /**
       * 设置电机
       */
      set_motor: 0x11,
      /**
       * 设置设置超声波灯光
       */
      set_ultrasonic_light: 0x12,
      /**
       * 设置舵机角度
       */
      set_Steering_engine: 0x19,
      /**
       * 设置蜂鸣器
       */
      set_buzzer: 0x13,
      /**
       * 设置点阵屏
       */
      set_matrix: 0x14,
      /**
       * 设置低电压报警
       */
      low_battery: 0x15,
      /**
       * 设置按键上报
       */
      click_button: 0x16,
      /**
       * 设置工作模式事件
       */
      set_work_mode: 0x18,
      /**
       * 固件升级开启
       */
      set_hardware_update: 0x21,
      /**
       * 获取超声波数值
       */
      get_ultrasonic_value: 0xA1,
       /**
       * 获取巡线数值
       */
      get_Line_value: 0xA4,
      /**
       * 获取按钮信息
       */
      get_button_info: 0xA2,
      /**
       * 获取电池电压
       */
      get_voltage: 0xA3,
    },
    autoAction: {
      /**
       * 用户按键按下主动
       */
      click_button: 0x01,
      /**
       * 低电压主动上报
       */
      low_battery: 0x02,
      /**
       * 单片机复位主动上报
       */
      reset: 0x03,
    },
    devices: {
      //电机
      motor: 0x01,
      //超声波
      ultrasonic: 0x02,
      //矩阵面板
      matrix: 0x03,
      //巡线传感器
      linefollow: 0x04
    }
  },
}
