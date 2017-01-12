const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const costumeLibraryContent = require('../lib/libraries/costumes.json');
const LibaryComponent = require('../components/library/library.jsx');


class CostumeLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected'
        ]);
    }
    handleItemSelected (item) {
        const vmCostume = {
            skin: `https://cdn.assets.scratch.mit.edu/internalapi/asset/${item.md5}/get/`,
            name: item.name,
            rotationCenterX: item.info[0],
            rotationCenterY: item.info[1]
        };
        if (item.info.length > 2) {
            vmCostume.bitmapResolution = item.info[2];
        }
        this.props.vm.addCostume(vmCostume);
    }
    render () {
        return (
            <LibaryComponent
                data={costumeLibraryContent}
                title="Costume Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

CostumeLibrary.propTypes = {
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = CostumeLibrary;
