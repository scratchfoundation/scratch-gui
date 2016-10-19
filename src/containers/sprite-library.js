const React = require('react');
const VM = require('scratch-vm');
const MediaLibrary = require('../lib/media-library');

const LibaryComponent = require('../components/library');

class SpriteLibrary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {data: [], spriteData: {}};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && this.state.data.length === 0) {
            this.props.mediaLibrary.getMediaLibrary('sprite', this.setData.bind(this));
        }
    }
    setData (data) {
        this.setState({data: data});
        for (let sprite of data) {
            this.props.mediaLibrary.getSprite(sprite.md5, this.setSpriteData.bind(this));
        }
    }
    setSpriteData (md5, data) {
        let spriteData = this.state.spriteData;
        spriteData[md5] = data;
        this.setState({spriteData: spriteData});
    }
    selectItem (item) {
        var spriteData = JSON.stringify(this.state.spriteData[item.json]);
        this.props.vm.addSprite2(spriteData);
    }
    render () {
        let libraryData = [];
        Object.keys(this.state.spriteData).map((libraryKey) => {
            let libraryItem = this.state.spriteData[libraryKey];
            libraryData.push(
                {
                    name: libraryItem.objName,
                    md5: libraryItem.costumes[0].baseLayerMD5,
                    json: libraryKey
                }
            );
        });
        return <LibaryComponent
            title="Sprite Library"
            visible={this.props.visible}
            data={libraryData}
            mediaLibrary={this.props.mediaLibrary}
            onRequestClose={this.props.onRequestClose}
            onItemSelected={this.selectItem.bind(this)} />;
    }
}

SpriteLibrary.propTypes = {
    vm: React.PropTypes.instanceOf(VM).isRequired,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    visible: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
};

module.exports = SpriteLibrary;
