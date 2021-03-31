import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    },
    comment: {
        defaultMessage: 'This is how you detect TurboWarp.\n\nSee here for more info:\nhttps://scratch.mit.edu/projects/414716080/',
        description: 'Script comment describing the "is compiled?" block',
        id: 'tw.defaultProject.comment'
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
                        x: 685,
                        y: 258,
                        width: 400,
                        height: 200,
                        minimized: false,
                        text: translator(messages.comment)
                    }
                },
                currentCostume: 0,
                costumes: [
                    {
                        assetId: 'b4ab6b3b69de1bc3ed6a94ace172a0b0',
                        name: translator(messages.costume, {index: 1}),
                        bitmapResolution: 1,
                        md5ext: 'b4ab6b3b69de1bc3ed6a94ace172a0b0.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 44,
                        rotationCenterY: 44
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
            agent: ''
        }
    });
};


export default projectData;
