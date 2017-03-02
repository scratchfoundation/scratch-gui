const bindAll = require('lodash.bindall');
const React = require('react');

const {connect} = require('react-redux');

const {
    openBackdropLibrary,
    openSpriteLibrary,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeSpriteLibrary
} = require('../reducers/modals');

const TargetPaneComponent = require('../components/target-pane/target-pane.jsx');

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeSpriteDraggability',
            'handleChangeSpriteName',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handleSelectSprite'
        ]);
    }
    handleChangeSpriteDraggability (draggable) {
        this.props.vm.postSpriteInfo({draggable});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteRotationStyle (rotationStyle) {
        this.props.vm.postSpriteInfo({rotationStyle});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    render () {
        return (
            <TargetPaneComponent
                {...this.props}
                onChangeSpriteDraggability={this.handleChangeSpriteDraggability}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onSelectSprite={this.handleSelectSprite}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetPaneProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetPaneProps
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: Object.keys(state.targets.sprites).reduce((sprites, k) => {
        let {x, y, ...sprite} = state.targets.sprites[k];
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        sprites[k] = {...sprite, x, y};
        return sprites;
    }, {}),
    stage: state.targets.stage,
    spriteLibraryVisible: state.modals.spriteLibrary,
    costumeLibraryVisible: state.modals.costumeLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
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
)(TargetPane);
