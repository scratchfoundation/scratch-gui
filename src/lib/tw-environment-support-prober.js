import Renderer from 'scratch-render';

let _isRendererSupported = null;
export const isRendererSupported = () => {
    if (_isRendererSupported === null) {
        _isRendererSupported = Renderer.isSupported();
    }
    return _isRendererSupported;
};

let _isEvalSupported = null;
export const isEvalSupported = () => {
    if (_isEvalSupported === null) {
        /* eslint-disable */
        let evalCheck = 0;
        try {
            eval('evalCheck=1');
        } catch (e) { /* ignore */ }
        _isEvalSupported = evalCheck === 1;
        /* eslint-enable */
    }
    return _isEvalSupported;
};
