import React from 'react';
import ScratchBlocks from 'scratch-blocks/blocks_compressed_vertical';

export default class Blocks extends React.Component {
    mountBlocks (component) {
        ScratchBlocks.inject(component, {});
    }
    render () {
        return (
            <div
                className="scratch-blocks"
                ref={this.mountBlocks} />
        );
    }
}
