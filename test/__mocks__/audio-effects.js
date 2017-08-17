export default class MockAudioEffects {
    static get effectTypes () { // @todo can this be imported from the real file?
        return {
            ROBOT: 'robot',
            REVERSE: 'reverse',
            LOUDER: 'higher',
            SOFTER: 'lower',
            FASTER: 'faster',
            SLOWER: 'slower',
            ECHO: 'echo'
        };
    }
    constructor (buffer, name) {
        this.buffer = buffer;
        this.name = name;
        this._mockResult = {};
        this._bufferPromise = new Promise(resolve => { // eslint-disable-line no-undef
            this._finishProcessing = newBuffer => resolve(newBuffer);
        });
        this.process = jest.fn(() => this._bufferPromise);
        MockAudioEffects.instance = this;
    }
}
