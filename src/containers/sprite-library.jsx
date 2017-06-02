const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const VM = require('scratch-vm');
const Renderer = require('scratch-render');
const Storage = require('../lib/storage');
const xhr = require('xhr');

const spriteLibraryContent = require('../lib/libraries/sprites.json');

const LibraryComponent = require('../components/library/library.jsx');

function download (content, contentType, filename) {
    const blob = new Blob([content], {type: contentType});
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.onclick = function () {
        setTimeout(() => window.URL.revokeObjectURL(this.href), 10);
    };
    link.click();
    link.remove();
}

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMouseEnter',
            'handleMouseLeave',
            'rotateCostume',
            'startRotatingCostumes',
            'stopRotatingCostumes'
        ]);
        this.state = {
            activeSprite: null,
            costumeIndex: 0,
            sprites: spriteLibraryContent
        };
    }
    componentDidMount () {
        const storage = new Storage();
        Promise.all(spriteLibraryContent.map(sprite =>
            Promise.all(sprite.json.costumes.map(costume => {
                const [md5, ext] = costume.baseLayerMD5.split('.');
                if (ext !== 'svg') return Promise.resolve(costume);
                return storage.load(storage.AssetType.ImageVector, md5)
                    .then(costumeAsset =>
                        new Promise(resolveSVG => {
                            const svgRenderer = new Renderer.SVGRenderer();
                            svgRenderer.fromString(costumeAsset.decodeText(), () => {
                                resolveSVG(svgRenderer._toString());
                            });
                        })
                    )
                    .then(svgContents => {
                        const newMd5 = storage.builtinHelper.cache(
                            storage.AssetType.ImageVector,
                            storage.DataFormat.SVG,
                            svgContents
                        );
                        // download(svgContents, 'image/svg+xml', `${newMd5}.svg`);
                        costume.baseLayerMD5 = `${newMd5}.svg`;
                        return costume;
                    });
            }))
            .then(costumes => {
                sprite.json.costumes = costumes;
                if (costumes[0].baseLayerMD5.split('.')[1] === 'svg') sprite.md5 = costumes[0].baseLayerMD5;
                return sprite;
            })
        ))
        .then(sprites => download(JSON.stringify(sprites, null, 4), 'application/json', 'sprites.json'));
    }
    componentWillReceiveProps (newProps) {
        if (!newProps.visible) clearInterval(this.intervalId);
    }
    handleItemSelect (item) {
        this.props.vm.addSprite2(JSON.stringify(item.json));
    }
    handleMouseEnter (item) {
        this.stopRotatingCostumes();
        this.setState({activeSprite: item}, this.startRotatingCostumes);
    }
    handleMouseLeave () {
        this.stopRotatingCostumes();
    }
    startRotatingCostumes () {
        if (!this.state.activeSprite) return;
        this.rotateCostume();
        this.intervalId = setInterval(this.rotateCostume, 300);
    }
    stopRotatingCostumes () {
        this.intervalId = clearInterval(this.intervalId);
    }
    rotateCostume () {
        const costumes = this.state.activeSprite.json.costumes;
        const nextCostumeIndex = (this.state.costumeIndex + 1) % costumes.length;
        this.setState({
            costumeIndex: nextCostumeIndex,
            sprites: this.state.sprites.map(sprite => {
                if (sprite.name === this.state.activeSprite.name) {
                    return {
                        ...sprite,
                        md5: sprite.json.costumes[nextCostumeIndex].baseLayerMD5
                    };
                }
                return sprite;
            })
        });
    }
    render () {
        return (
            <LibraryComponent
                data={this.state.sprites}
                title="Sprite Library"
                visible={this.props.visible}
                onItemMouseEnter={this.handleMouseEnter}
                onItemMouseLeave={this.handleMouseLeave}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

module.exports = SpriteLibrary;
