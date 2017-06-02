const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const Renderer = require('scratch-render');
const Storage = require('../lib/storage');
const VM = require('scratch-vm');

const costumeLibraryContent = require('../lib/libraries/costumes.json');
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

class CostumeLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected'
        ]);
    }
    componentDidMount () {
        const storage = new Storage();
        Promise.all(costumeLibraryContent.map(costume => {
            const [md5, ext] = costume.md5.split('.');
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
                    costume.md5 = `${newMd5}.svg`;
                    return costume;
                });
        }))
        .then(costumes => download(JSON.stringify(costumes, null, 4), 'application/json', 'costumes.json'));
    }
    handleItemSelected (item) {
        const vmCostume = {
            name: item.name,
            rotationCenterX: item.info[0],
            rotationCenterY: item.info[1],
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.props.vm.addCostume(item.md5, vmCostume);
    }
    render () {
        return (
            <LibraryComponent
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
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

module.exports = CostumeLibrary;
