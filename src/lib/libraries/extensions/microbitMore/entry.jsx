import React from 'react';
import {FormattedMessage} from 'react-intl';

import microbitMoreIconURL from './microbitMore.png';
import microbitMoreInsetIconURL from './microbitMore-small.svg';
import microbitMoreConnectionIconURL from './microbitMore-illustration.svg';
import microbitMoreConnectionSmallIconURL from './microbitMore-small.svg';

export default {
    name: 'micro:bit MORE v0.4.3',
    extensionId: 'microbitMore',
    collaborator: 'Yengawa Lab',
    iconURL: microbitMoreIconURL,
    insetIconURL: microbitMoreInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Connect your projects with the world."
            description="Description for the 'micro:bit' extension"
            id="gui.extension.microbit.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: microbitMoreConnectionIconURL,
    connectionSmallIconURL: microbitMoreConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their micro:bit."
            id="gui.extension.microbit.connectingMessage"
        />
    ),
    helpLink: 'https://lab.yengawa.com/project/scratch-microbit-more/'
};
