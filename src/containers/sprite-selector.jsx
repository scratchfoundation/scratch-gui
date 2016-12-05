const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const {connect} = require('react-redux');

const {
    openBackdropLibrary,
    openCostumeLibrary,
    openSpriteLibrary,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeSpriteLibrary
} = require('../reducers/modals');

const BackdropLibrary = require('./backdrop-library.jsx');
const CostumeLibrary = require('./costume-library.jsx');
const MediaLibrary = require('../lib/media-library');
const SpriteLibrary = require('./sprite-library.jsx');
const SpriteSelectorComponent = require('../components/sprite-selector.jsx');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSprite'
        ]);
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            editingTarget,
            mediaLibrary,
            backdropLibraryVisible,
            costumeLibraryVisible,
            spriteLibraryVisible,
            onNewSpriteClick,
            onNewCostumeClick,
            onNewBackdropClick,
            onRequestCloseBackdropLibrary,
            onRequestCloseCostumeLibrary,
            onRequestCloseSpriteLibrary,
            targets,
            vm,
            /* eslint-enable no-unused-vars */
            ...componentProps
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
                    selectedId={editingTarget}
                    sprites={targets}
                    onSelectSprite={this.handleSelectSprite}
                    {...componentProps}
                />
                <p>
                    <button onClick={onNewSpriteClick}>New Sprite</button>
                    <SpriteLibrary
                        mediaLibrary={mediaLibrary}
                        visible={spriteLibraryVisible}
                        vm={vm}
                        onRequestClose={onRequestCloseSpriteLibrary}
                    />
                    <button onClick={onNewCostumeClick}>New Costume</button>
                    <CostumeLibrary
                        mediaLibrary={mediaLibrary}
                        visible={costumeLibraryVisible}
                        vm={vm}
                        onRequestClose={onRequestCloseCostumeLibrary}
                    />
                    <button onClick={onNewBackdropClick}>New Backdrop</button>
                    <BackdropLibrary
                        mediaLibrary={mediaLibrary}
                        visible={backdropLibraryVisible}
                        vm={vm}
                        onRequestClose={onRequestCloseBackdropLibrary}
                    />
                </p>
            </div>
        );
    }
}

SpriteSelector.propTypes = {
    backdropLibraryVisible: React.PropTypes.bool,
    costumeLibraryVisible: React.PropTypes.bool,
    editingTarget: React.PropTypes.string,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    onNewBackdropClick: React.PropTypes.func,
    onNewCostumeClick: React.PropTypes.func,
    onNewSpriteClick: React.PropTypes.func,
    onRequestCloseBackdropLibrary: React.PropTypes.func,
    onRequestCloseCostumeLibrary: React.PropTypes.func,
    onRequestCloseSpriteLibrary: React.PropTypes.func,
    spriteLibraryVisible: React.PropTypes.bool,
    targets: React.PropTypes.objectOf(React.PropTypes.shape({
        costume: React.PropTypes.shape({
            skin: React.PropTypes.string,
            name: React.PropTypes.string,
            bitmapResolution: React.PropTypes.number,
            rotationCenterX: React.PropTypes.number,
            rotationCenterY: React.PropTypes.number
        }),
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        order: React.PropTypes.number
    })),
    vm: React.PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    targets: state.targets.targets,
    spriteLibraryVisible: state.modals.spriteLibrary,
    costumeLibraryVisible: state.modals.costumeLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewCostumeClick: e => {
        e.preventDefault();
        dispatch(openCostumeLibrary());
    },
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseBackdropLibrary: () => {
        dispatch(closeBackdropLibrary());
    },
    onRequestCloseCostumeLibrary: () => {
        dispatch(closeCostumeLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteSelector);
