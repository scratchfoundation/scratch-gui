const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const backdropLibraryContent = require('../lib/libraries/backdrops.json');
const LibaryComponent = require('../components/library/library.jsx');


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        const vmBackdrop = {
            name: item.name,
            rotationCenterX: item.info[0] && item.info[0] / 2,
            rotationCenterY: item.info[1] && item.info[1] / 2,
            skinId: null
        };
        if (item.info.length > 2) {
            vmBackdrop.bitmapResolution = item.info[2];
        }
        this.props.vm.addBackdrop(item.md5, vmBackdrop);
    }
    render () {
        return (
            <LibaryComponent
                data={backdropLibraryContent}
                title="Backdrop Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

BackdropLibrary.propTypes = {
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = BackdropLibrary;
