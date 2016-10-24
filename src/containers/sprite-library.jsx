const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');
const MediaLibrary = require('../lib/media-library');

const LibaryComponent = require('../components/library.jsx');

class SpriteLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['setData', 'handleItemSelect', 'setSpriteData']);
        this.state = {data: [], spriteData: {}};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.visible && this.state.data.length === 0) {
            this.props.mediaLibrary.getMediaLibrary('sprite', this.setData);
        }
    }
    setData (data) {
        this.setState({data: data});
        for (const sprite of data) {
            this.props.mediaLibrary.getSprite(sprite.md5, this.setSpriteData);
        }
    }
    setSpriteData (md5, data) {
        this.setState({
            spriteData: Object.assign({}, this.state.spriteData, {[md5]: data})
        });
    }
    handleItemSelect (item) {
        const spriteData = JSON.stringify(this.state.spriteData[item.json]);
        this.props.vm.addSprite2(spriteData);
    }
    render () {
        return (
            <LibaryComponent
                data={Object.keys(this.state.spriteData).map(libraryKey => {
                    const libraryItem = this.state.spriteData[libraryKey];
                    return {
                        name: libraryItem.objName,
                        md5: libraryItem.costumes[0].baseLayerMD5,
                        json: libraryKey
                    };
                })}
                mediaLibrary={this.props.mediaLibrary}
                title="Sprite Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = SpriteLibrary;
