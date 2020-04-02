const AudioContext = window.AudioContext || window.webkitAudioContext;
const GLOBALS = {
    learnClassCount: 3,
    button: {
        padding: 0,
        frontHeight: 40,
        states: {
            normal: {
                x: 8,
                y: 8
            },
            pressed: {
                x: 4,
                y: 4
            }
        }
    },
    classNames: [
        'green',
        'purple',
        'orange',
        'red'
    ],
    colors: {
        green: '#2baa5e',
        purple: '#c95ac5',
        orange: '#dd4d31',
        red: '#e8453c'
    },
    rgbaColors: {
        green: 'rgba(43, 170, 94, 0.25)',
        purple: 'rgba(201, 90, 197, 0.25)',
        orange: 'rgba(221, 77, 49, 0.25)',
        red: 'rgba(232, 69, 60, 0.25)'
    },
    classId: null,
    predicting: false,
    micThreshold: 25,
    classesTrained: {
        green: false,
        purple: false,
        orange: false
    },
    numClasses: 3,
    audioContext: new AudioContext(),
    isBackFacingCam: false
};

export default GLOBALS;
