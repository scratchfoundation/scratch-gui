import React from 'react';
import VM from 'scratch-vm';
import Blocks from './blocks';

export default class GUI extends React.Component {
    render () {
        return (
            <div className="scratch-gui">
                <Blocks />
            </div>
        );
    }
}

GUI.defaultProps = {
    vm: new VM()
};
