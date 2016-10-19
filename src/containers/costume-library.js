const React = require('react');
const VM = require('scratch-vm');
const MediaLibrary = require('../lib/media-library');

const LibaryComponent = require('../components/library');


class CostumeLibrary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {costumeData: []};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && this.state.costumeData.length === 0) {
            this.props.mediaLibrary.getMediaLibrary('costume', this.setData.bind(this));
        }
    }
    setData (data) {
        this.setState({costumeData: data});
    }
    selectItem (item) {
        var vmCostume = {
            skin: 'https://cdn.assets.scratch.mit.edu/internalapi/asset/' + item.md5 + '/get/',
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
        return <LibaryComponent
            title="Costume Library"
            visible={this.props.visible}
            data={this.state.costumeData}
            onRequestClose={this.props.onRequestClose}
            onItemSelected={this.selectItem.bind(this)} />;
    }
}

CostumeLibrary.propTypes = {
    vm: React.PropTypes.instanceOf(VM).isRequired,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    visible: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
};

module.exports = CostumeLibrary;
