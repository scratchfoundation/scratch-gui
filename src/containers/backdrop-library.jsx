const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');
const MediaLibrary = require('../lib/media-library');

const LibaryComponent = require('../components/library.jsx');


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['setData', 'handleItemSelect']);
        this.state = {backdropData: []};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && this.state.backdropData.length === 0) {
            this.props.mediaLibrary.getMediaLibrary('backdrop', this.setData);
        }
    }
    setData (data) {
        this.setState({backdropData: data});
    }
    handleItemSelect (item) {
        const vmBackdrop = {
            skin: `https://cdn.assets.scratch.mit.edu/internalapi/asset/${item.md5}/get/`,
            name: item.name,
            rotationCenterX: item.info[0],
            rotationCenterY: item.info[1]
        };
        if (item.info.length > 2) {
            vmBackdrop.bitmapResolution = item.info[2];
        }
        this.props.vm.addBackdrop(vmBackdrop);
    }
    render () {
        return (
            <LibaryComponent
                data={this.state.backdropData}
                title="Backdrop Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

BackdropLibrary.propTypes = {
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = BackdropLibrary;
