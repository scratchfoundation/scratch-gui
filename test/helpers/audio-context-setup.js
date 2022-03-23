import 'web-audio-test-api';

const WebAudioTestAPI = global.WebAudioTestAPI;

beforeAll(() => {
    WebAudioTestAPI.setState('AudioContext#resume', 'enabled');
});

afterAll(() => {
    WebAudioTestAPI.setState('AudioContext#resume', 'disabled');
});
