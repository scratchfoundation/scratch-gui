import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicImage from './music.png';
import penImage from './pen.png';
import videoImage from './video-sensing.png';
import speechImage from './speech.png';
import microbitImage from './microbit.png';
import wedoImage from './wedo.png';
import ev3Image from './ev3.png';
import boostImage from './boost.png';
import translateImage from './translate.png';

import ev3DeviceImage from './device-connection/ev3/ev3-hub-illustration.svg';
import ev3MenuImage from './device-connection/ev3/ev3-small.svg';

import microbitDeviceImage from './device-connection/microbit/microbit-illustration.svg';
import microbitMenuImage from './device-connection/microbit/microbit-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicImage,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penImage,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Google Translate"
                description="Name for the 'Google Translate' extension"
                id="gui.extension.googletranslate.name"
            />
        ),
        extensionId: 'translate',
        iconURL: translateImage,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the 'Google Translate' extension. Do not translate 'Google'"
                id="gui.extension.googletranslate.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Motion"
                description="Name for the 'Video Motion' extension"
                id="gui.extension.videomotion.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoImage,
        description: (
            <FormattedMessage
                defaultMessage="Detect motion with the camera."
                description="Description for the 'Video Motion' extension"
                id="gui.extension.videomotion.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Speech Recognition"
                description="Name for the 'Speech Recognition' extension"
                id="gui.extension.speechrecognition.name"
            />
        ),
        extensionId: 'speech',
        iconURL: speechImage,
        description: (
            <FormattedMessage
                defaultMessage="Talk to your projects."
                description="Description for the 'Speech Recognition' extension"
                id="gui.extension.speechrecognition.description"
            />
        ),
        featured: true,
        disabled: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        iconURL: microbitImage,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        disabled: true,
        launchDeviceConnectionFlow: true,
        deviceImage: microbitDeviceImage,
        smallDeviceImage: microbitMenuImage
    },
    {
        name: 'LEGO WeDo 2.0',
        extensionId: 'wedo2',
        iconURL: wedoImage,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: true
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        iconURL: ev3Image,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: true,
        launchDeviceConnectionFlow: true,
        deviceImage: ev3DeviceImage,
        smallDeviceImage: ev3MenuImage
    },
    {
        name: 'LEGO Boost',
        extensionId: 'boost',
        iconURL: boostImage,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO Boost' extension"
                id="gui.extension.boost.description"
            />
        ),
        featured: true,
        disabled: true
    }
];
