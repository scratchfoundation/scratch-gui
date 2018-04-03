import boostImage from './boost.png';
import musicImage from './music.png';
import penImage from './pen.png';
import speechImage from './speech.png';
import videoImage from './video-sensing.png';
import wedoImage from './wedo.png';

export default [
    {
        name: 'Music',
        extensionURL: 'music',
        iconURL: musicImage,
        description: 'Play instruments and drums.',
        featured: true
    },
    {
        name: 'Pen',
        extensionURL: 'pen',
        iconURL: penImage,
        description: 'Draw with your sprites.',
        featured: true
    },
    {
        name: 'Video Sensing',
        extensionURL: 'videoSensing',
        iconURL: videoImage,
        description: 'Detect motion with the camera.',
        featured: true
    },
    {
        name: 'LEGO WeDo 2.0',
        extensionURL: '',
        iconURL: wedoImage,
        description: 'Build with motors and sensors.',
        featured: true,
        disabled: true
    },
    {
        name: 'Speech',
        extensionURL: '',
        iconURL: speechImage,
        description: 'Talk to your projects.',
        featured: true,
        disabled: true
    },
    {
        name: 'LEGO Boost',
        extensionURL: '',
        iconURL: boostImage,
        description: 'Build robots and more.',
        featured: true,
        disabled: true
    }
];
