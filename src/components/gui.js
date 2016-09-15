import React from 'react';
import VM from 'scratch-vm';
import Blocks from './blocks';
import Toolbox from './toolbox';

export default class GUI extends React.Component {
    render () {
        return (
            <div className="scratch-gui">
                <Toolbox ref={toolbox => this.toolbox = toolbox} />
                <Blocks
                    options={{
                        toolbox: this.toolbox
                    }}
                />
            </div>
        );
    }
}

GUI.defaultProps = {
    vm: new VM()
};
