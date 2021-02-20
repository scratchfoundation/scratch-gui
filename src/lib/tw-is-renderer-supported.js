import Renderer from 'scratch-render';

let _isRendererSupported = null;

const isRendererSupported = () => {
    if (_isRendererSupported === null) {
        _isRendererSupported = Renderer.isSupported();
    }
    return _isRendererSupported;
};

export default isRendererSupported;
