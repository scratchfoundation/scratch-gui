import 'web-audio-test-api';

const WebAudioTestAPI = global.WebAudioTestAPI;
let oldResumeState;

// Thanks to @matshaffer on GitHub for this solution

beforeAll(() => {
    oldResumeState = WebAudioTestAPI.getState('AudioContext#resume');
    WebAudioTestAPI.setState('AudioContext#resume', 'enabled');
});

afterAll(() => {
    WebAudioTestAPI.setState('AudioContext#resume', oldResumeState);
});
