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
        this.process = jest.fn(done => {
            this._finishProcessing = renderedBuffer => {
                done(renderedBuffer, 0, 1);
                return new Promise(resolve => setTimeout(resolve));
            };
        });
        MockAudioEffects.instance = this;
    }
}
