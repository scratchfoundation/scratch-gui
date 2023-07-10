import React from 'react';
import {FormattedMessage} from 'react-intl';
import {defaults} from 'lodash';
import log from '../../log';
// import {DeviceType} from '../../device';

// import arduinoBaseToolBox from './baseToolbox/arduino';
import esp32IconURL from './esp32/esp32.png';
import esp32ConnectionIconURLL from './esp32/esp32-illustration.svg';
import esp32ConnectionSmallIconURL from './esp32/esp32-small.svg';


const deviceData = [
    /**
     * Unselect the device back to pure scratch mode
     */
    {
        name: 'ESP32',
        deviceId: 'arduinoEsp32',
        iconURL: esp32IconURL,
        description: (
            <FormattedMessage
                defaultMessage="Wi-Fi & Bluetooth control board with rich functions."
                description="Description for the esp32 device"
                id="gui.device.esp32.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: esp32ConnectionIconURLL,
        connectionSmallIconURL: esp32ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their esp32."
                id="gui.device.esp32.connectingMessage"
            />
        ),
        // TODO:
        // serialportRequired: true,
        // defaultBaudRate: '115200',
        // manufactor: 'espressif',
        // learnMore: 'https://www.espressif.com/',
        // type: DeviceType.arduino,
        // baseToolBoxXml: arduinoBaseToolBox,
        // programMode: ['upload', 'realtime'],
        // programLanguage: ['block', 'c', 'cpp'],
        // tags: ['arduino'],
        helpLink: 'https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/hw-reference/esp32/get-started-devkitc.html'
    }
];

/**
 * To get real device id. eg: the third party id like ironKit_arduinoUno.
 * @param {string} deviceId - the id of the device.
 * @return {string} deviceId - the real device id.
 */
const analysisRealDeviceId = deviceId => {
    if (deviceId){
        // if the id contain '_' use the string afer the '_'.
        if (deviceId.indexOf('_') !== -1) {
            deviceId = deviceId.split('_')[1];
        }
    }
    return deviceId;
};

/**
 * Make device data from the input data. If it is a buid-in device, return the buid-in
 * data. If it is a third party device, find it's parent device, and overwrite its attributes
 * with the input data.
 * @param {string} deviceList - the list of devices.
 * @return {string} fullData - processed data of devices.
 */
const makeDeviceLibrary = (deviceList = null) => {
    let regeneratedDeviceData = [];

    if (deviceList) {
        deviceList.forEach(dev => {
            // Because the micropython framework is not included in the community version,
            // for a control board that supports multiple programming frameworks, if it
            // also supports arduino, then we only load the arduino version of the device.
            if ((typeof dev.typeList !== 'undefined') && (dev.deviceId.indexOf('arduino') !== -1)) {
                dev.hide = false;
            }

            // Check if this is a build-in device.
            const matchedDevice = deviceData.find(item => dev.deviceId === item.deviceId);
            if (matchedDevice) {
                return regeneratedDeviceData.push(matchedDevice);
            }

            // This is a third party device. Try to parse its parent device.
            const realDeviceId = analysisRealDeviceId(dev.deviceId);
            if (realDeviceId) {
                const parentDevice = deviceData.find(item => realDeviceId === item.deviceId);
                if (parentDevice) {
                    return regeneratedDeviceData.push(defaults({}, dev, {hide: false}, parentDevice));
                }
            }
            log.warn('Cannot find this device or it\'s parent device :', dev.deviceId);
            return null;
        });

        regeneratedDeviceData.unshift(deviceData[0]); // add unselect deive in the head.
    } else {
        regeneratedDeviceData = deviceData;
    }

    return regeneratedDeviceData;
};

export {
    deviceData as default,
    makeDeviceLibrary
};
