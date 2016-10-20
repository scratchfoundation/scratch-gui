const React = require('react');
const VM = require('scratch-vm');
const MediaLibrary = require('../lib/media-library');

const LibaryComponent = require('../components/library');


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {backdropData: []};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && this.state.backdropData.length === 0) {
            this.props.mediaLibrary.getMediaLibrary('backdrop', this.setData.bind(this));
        }
    }
    setData (data) {
        this.setState({backdropData: data});
    }
    selectItem (item) {
        var vmBackdrop = {
            skin: 'https://cdn.assets.scratch.mit.edu/internalapi/asset/' + item.md5 + '/get/',
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
        return <LibaryComponent
            title="Backdrop Library"
            visible={this.props.visible}
            data={this.state.backdropData}
            onRequestClose={this.props.onRequestClose}
            onItemSelected={this.selectItem.bind(this)}
        />;
    }
}

BackdropLibrary.propTypes = {
    vm: React.PropTypes.instanceOf(VM).isRequired,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    visible: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
};

module.exports = BackdropLibrary;
