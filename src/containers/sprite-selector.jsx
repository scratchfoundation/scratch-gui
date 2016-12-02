const bindAll = require('lodash.bindall');
const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const BackdropLibrary = require('./backdrop-library.jsx');
const CostumeLibrary = require('./costume-library.jsx');
const MediaLibrary = require('../lib/media-library');
const SpriteLibrary = require('./sprite-library.jsx');
const SpriteSelectorComponent = require('../components/sprite-selector.jsx');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSprite',
            'handleCloseBackdropLibrary',
            'handleCloseCostumeLibrary',
            'handleCloseSpriteLibrary',
            'handleNewBackdropClick',
            'handleNewCostumeClick',
            'handleNewSpriteClick',
            'handleSpriteInfoReport',
            'targetsUpdate'
        ]);
        this.state = {
            backdropLibraryVisible: false,
            costumeLibraryVisible: false,
            spriteLibraryVisible: false,
            targets: {}
        };
    }
    componentDidMount () {
        this.props.vm.on('targetsUpdate', this.targetsUpdate);
        this.props.vm.on('SPRITE_INFO_REPORT', this.handleSpriteInfoReport);
    }
    componentWillUnmount () {
        this.props.vm.off('targetsUpdate', this.targetsUpdate);
        this.props.vm.off('SPRITE_INFO_REPORT', this.handleSpriteInfoReport);
    }
    handleSelectSprite (spriteId) {
        this.props.vm.setEditingTarget(spriteId);
    }
    handleNewBackdropClick (e) {
        e.preventDefault();
        this.setState({backdropLibraryVisible: true});
    }
    handleCloseBackdropLibrary () {
        this.setState({backdropLibraryVisible: false});
    }
    handleNewCostumeClick (e) {
        e.preventDefault();
        this.setState({costumeLibraryVisible: true});
    }
    handleCloseCostumeLibrary () {
        this.setState({costumeLibraryVisible: false});
    }
    handleNewSpriteClick (e) {
        e.preventDefault();
        this.setState({spriteLibraryVisible: true});
    }
    handleCloseSpriteLibrary () {
        this.setState({spriteLibraryVisible: false});
    }
    handleSpriteInfoReport (spriteInfo) {
        this.setState(prevState => ({
            // Merge sprite info with list from targetsUpdate. This data may
            // come before targetsUpdate, so add it pre-emptively
            targets: defaultsDeep({[spriteInfo.id]: spriteInfo}, prevState.targets)
        }));
    }
    targetsUpdate (data) {
        this.setState(prevState => ({
            editingTarget: data.editingTarget,
            // Merge new target list with data from sprite info reports
            // Maintain list order with `order` attribute
            targets: data.targetList.reduce(
                (targets, target, listId) => defaultsDeep(
                    {[target[0]]: {name: target[1], order: listId}},
                    {[target[0]]: prevState.targets[target[0]]},
                    targets
                ),
                {}
            )
        }));
    }
    render () {
        const {
            mediaLibrary,
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <div
                className="scratch-sprite-selector"
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 10
                }}
            >
                <SpriteSelectorComponent
                    selectedId={this.state.editingTarget}
                    sprites={this.state.targets}
                    onSelectSprite={this.handleSelectSprite}
                    {...props}
                />
                <p>
                    <button onClick={this.handleNewSpriteClick}>New Sprite</button>
                    <SpriteLibrary
                        mediaLibrary={mediaLibrary}
                        visible={this.state.spriteLibraryVisible}
                        vm={this.props.vm}
                        onRequestClose={this.handleCloseSpriteLibrary}
                    />
                    <button onClick={this.handleNewCostumeClick}>New Costume</button>
                    <CostumeLibrary
                        mediaLibrary={mediaLibrary}
                        visible={this.state.costumeLibraryVisible}
                        vm={this.props.vm}
                        onRequestClose={this.handleCloseCostumeLibrary}
                    />
                    <button onClick={this.handleNewBackdropClick}>New Backdrop</button>
                    <BackdropLibrary
                        mediaLibrary={mediaLibrary}
                        visible={this.state.backdropLibraryVisible}
                        vm={this.props.vm}
                        onRequestClose={this.handleCloseBackdropLibrary}
                    />
                </p>
            </div>
        );
    }
}

SpriteSelector.propTypes = {
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = SpriteSelector;
