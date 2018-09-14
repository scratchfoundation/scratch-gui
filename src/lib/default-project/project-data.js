import ScratchBlocks from 'scratch-blocks';

const translate = ScratchBlocks.ScratchMsgs.translate;

const data = {
    targets: [
        {
            isStage: true,
            name: translate('DEFAULT_STAGE', 'Stage'),
            variables: {
                '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                    translate('DEFAULT_MY_VARIABLE', 'my variable'), // @TODO define in messages
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
                    name: translate('DEFAULT_BACKDROP1', 'backdrop1'),
                    md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                    dataFormat: 'svg',
                    rotationCenterX: 240,
                    rotationCenterY: 180
                }
            ],
            sounds: [
                {
                    assetId: '83a9787d4cb6f3b7632b4ddfebf74367',
                    name: translate('DEFAULT_SOUND_POP', 'pop'),
                    dataFormat: 'wav',
                    format: '',
                    rate: 11025,
                    sampleCount: 258,
                    md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav'
                }
            ],
            volume: 100,
            tempo: 60,
            videoTransparency: 50,
            videoState: 'off'
        },
        {
            isStage: false,
            name: translate('DEFAULT_SPRITE1', 'Sprite1'),
            variables: {},
            lists: {},
            broadcasts: {},
            blocks: {},
            currentCostume: 0,
            costumes: [
                {
                    assetId: '09dc888b0b7df19f70d81588ae73420e',
                    name: translate('DEFAULT_COSTUME1', 'costume1'),
                    bitmapResolution: 1,
                    md5ext: '09dc888b0b7df19f70d81588ae73420e.svg',
                    dataFormat: 'svg',
                    rotationCenterX: 47,
                    rotationCenterY: 55
                },
                {
                    assetId: '3696356a03a8d938318876a593572843',
                    name: translate('DEFAULT_COSTUME2', 'costume2'),
                    bitmapResolution: 1,
                    md5ext: '3696356a03a8d938318876a593572843.svg',
                    dataFormat: 'svg',
                    rotationCenterX: 47,
                    rotationCenterY: 55
                }
            ],
            sounds: [
                {
                    assetId: '83c36d806dc92327b9e7049a565c6bff',
                    name: translate('DEFAULT_SOUND_MEOW', 'Meow'),
                    dataFormat: 'wav',
                    format: '',
                    rate: 22050,
                    sampleCount: 18688,
                    md5ext: '83c36d806dc92327b9e7049a565c6bff.wav'
                }
            ],
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
};

export default data;
