import React from 'react';

// Portions of this file were adapted from HexFlashTool.tsx from the micro:bit website.
// Thanks, micro:bit team!

import {
    IndividualHex,
    isUniversalHex,
    separateUniversalHex
} from '@microbit/microbit-universal-hex';
import {WebUSB, DAPLink} from 'dapjs';

// TODO: what's the right way to do this? What settings would make `import firmwareUrl from '...hex'` work?
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-var-requires
const firmwareUrl = require('../../static/scratch-microbit-1.2.0.hex');

enum DeviceVersion {
    V1,
    V2,
}

const vendorId = 0x0d28;
const productId = 0x0204;


function getDeviceVersion(device: USBDevice): DeviceVersion {
    const microBitBoardId = device?.serialNumber?.substring(0, 4) ?? '';

    switch (microBitBoardId) {
        case '9900':
        case '9901':
            return DeviceVersion.V1;
        case '9903':
        case '9904':
        case '9905':
        case '9906':
            return DeviceVersion.V2;
    }

    throw new Error("Could not identify board version");
}

function getHexVersion(hex: IndividualHex): DeviceVersion {
    switch (hex.boardId) {
        case 0x9900:
        case 0x9901:
            return DeviceVersion.V1;
        case 0x9903:
        case 0x9904:
        case 0x9905:
        case 0x9906:
            return DeviceVersion.V2;
    }

    throw new Error("Could not identify hex version");
}

async function getFirmwareMap(): Promise<Map<DeviceVersion, Uint8Array>> {
    const response = await fetch(firmwareUrl);
    const hex = await response.text();

    if (!isUniversalHex(hex)) {
        throw new Error('Firmware must be a universal hex file');
    }

    const firmwareMap = new Map<DeviceVersion, Uint8Array>();

    for (const hexObj of separateUniversalHex(hex)) {
        const version = getHexVersion(hexObj);
        const binary = new TextEncoder().encode(hex);
        firmwareMap.set(version, binary);
    }

    return firmwareMap;
}

async function flashDevice(device: USBDevice): Promise<void> {
    const transport = new WebUSB(device);
    const target = new DAPLink(transport);
    const version = getDeviceVersion(device);
    const firmware = (await getFirmwareMap()).get(version);
    if (!firmware) {
        throw new Error(`No firmware for device version ${version}`);
    }
    target.on(DAPLink.EVENT_PROGRESS, (progress: number) => {
        console.log(`progress: ${progress}`);
    });
    console.log('connecting to target');
    await target.connect();
    console.log('flashing target');
    await target.flash(firmware);
    console.log('disconnecting from target');
    await target.disconnect();
    console.log('done');
}

async function writeFirmware(): Promise<void> {
    console.log('selecting device');

    try {
        const device = await navigator.usb.requestDevice({
            filters: [{vendorId, productId}]
        });
        await flashDevice(device);
        console.log('flash complete');
    } catch (e) {
        console.error('flash failed', e);
    }
};

const MicroBitFirmwareWriter = () => (
    <div>
        <p>{'Hello'}</p>
        <p>{firmwareUrl}</p>
        <button onClick={writeFirmware}>{'Do the thing!'}</button>
    </div>
);

export default MicroBitFirmwareWriter;
