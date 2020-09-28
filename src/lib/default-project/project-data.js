import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    meow: {
        defaultMessage: 'Meow',
        description: 'Name for the meow sound',
        id: 'gui.defaultProject.meow'
    },
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {
                    '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                        translator(messages.variable),
                        0
                    ]
                },
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                        name: translator(messages.backdrop, {index: 1}),
                        md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 240,
                        rotationCenterY: 180
                    }
                ],
                sounds: [],
                volume: 100
            },
            {
                isStage: false,
                name: translator(messages.sprite, {index: 1}),
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {
                    'Z2l`f?]oj|=Nq/GH@G_u': {
                        opcode: 'control_if_else',
                        next: null,
                        parent: null,
                        inputs: {
                            CONDITION: [2, 'Fj5[gB=S0qJiUu$/!nym'],
                            SUBSTACK: [1, null],
                            SUBSTACK2: [1, null]
                        },
                        fields: {},
                        shadow: false,
                        topLevel: true,
                        x: 302,
                        y: 250,
                        comment: 'UgZfouDT0`j;EW7Y3N2]'
                    },
                    'Fj5[gB=S0qJiUu$/!nym': {
                        opcode: 'argument_reporter_boolean',
                        next: null,
                        parent: 'Z2l`f?]oj|=Nq/GH@G_u',
                        inputs: {},
                        fields: {VALUE: ['is compiled?', null]},
                        shadow: false,
                        topLevel: false
                    }
                },
                comments: {
                    'UgZfouDT0`j;EW7Y3N2]': {
                        blockId: 'Z2l`f?]oj|=Nq/GH@G_u',
                        x: 685.1870417418297,
                        y: 258.07407407407516,
                        width: 410.370361328125,
                        height: 201.48150634765625,
                        minimized: false,
                        text: 'This is how you detect TurboWarp.\n\nSee here for more info:\nhttps://scratch.mit.edu/projects/414716080/'
                    }
                },
                currentCostume: 0,
                costumes: [
                    {
                        assetId: '14e46ec3e2ba471c2adfe8f119052307',
                        name: translator(messages.costume, {index: 1}),
                        bitmapResolution: 1,
                        md5ext: '14e46ec3e2ba471c2adfe8f119052307.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 0,
                        rotationCenterY: 0
                    }
                ],
                sounds: [],
                volume: 100,
                visible: true,
                x: 0,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            }
        ],
        meta: {
            semver: '3.0.0',
            vm: '0.1.0',
            agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' // eslint-disable-line max-len
        }
    });
};


export default projectData;
