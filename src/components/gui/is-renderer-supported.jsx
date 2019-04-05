import React from 'react';
import Renderer from 'scratch-render';

import {
    SVGRenderer as V2SVGAdapter,
    BitmapAdapter as V2BitmapAdapter
} from 'scratch-svg-renderer';

let _isRendererSupported = null;

const isRendererSupported = WrappedComponent => (
    function IsRendererSupported (props) {
        const {vm} = props;
        if (_isRendererSupported === null) {
            if (vm.renderer) {
                _isRendererSupported = true;
            } else {
                const canvas = document.createElement('canvas');
                _isRendererSupported = Renderer.isSupported(canvas);
                if (_isRendererSupported) {
                    // Sharing the canvas that is used to check if renderer is
                    // supported lets us reuse the WebGL context produced in
                    // isSupported. That reuse can save a good bit of time.
                    const renderer = new Renderer(canvas);
                    vm.attachRenderer(renderer);

                    vm.attachV2SVGAdapter(new V2SVGAdapter());
                    vm.attachV2BitmapAdapter(new V2BitmapAdapter());
                }
            }
        }
        return (<WrappedComponent
            isRendererSupported={_isRendererSupported}
            {...props}
        />);
    }
);

export default isRendererSupported;
