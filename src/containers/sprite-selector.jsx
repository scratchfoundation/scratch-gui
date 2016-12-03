const bindAll = require('lodash.bindall');
const {connect} = require('react-redux');
const React = require('react');
const VM = require('scratch-vm');

const {updateEditingTarget} = require('../reducers/targets');

const BackdropLibrary = require('./backdrop-library.jsx');
const CostumeLibrary = require('./costume-library.jsx');
const MediaLibrary = require('../lib/media-library');
const SpriteLibrary = require('./sprite-library.jsx');
const SpriteSelectorComponent = require('../components/sprite-selector.jsx');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCloseBackdropLibrary',
            'handleCloseCostumeLibrary',
            'handleCloseSpriteLibrary',
            'handleNewBackdropClick',
            'handleNewCostumeClick',
            'handleNewSpriteClick'
        ]);
        this.state = {
            backdropLibraryVisible: false,
            costumeLibraryVisible: false,
            spriteLibraryVisible: false,
            targets: {}
        };
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
    render () {
        const {
            /* eslint-disable no-unused-vars */
            editingTarget,
            mediaLibrary,
            targets,
            vm,
            /* eslint-enable no-unused-vars */
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
                    selectedId={this.props.editingTarget}
                    sprites={this.props.targets}
                    onSelectSprite={this.props.onSelectSprite}
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
    editingTarget: React.PropTypes.string,
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    onSelectSprite: React.PropTypes.func,
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
    targets: state.targets.targets,
    editingTarget: state.targets.editingTarget
});
const mapDispatchToProps = dispatch => ({
    onSelectSprite: id => dispatch(updateEditingTarget(id))
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteSelector);
