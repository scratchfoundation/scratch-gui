const bindAll = require('lodash.bindall');
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
            'handleChange',
            'handleCloseBackdropLibrary',
            'handleCloseCostumeLibrary',
            'handleCloseSpriteLibrary',
            'handleNewBackdropClick',
            'handleNewCostumeClick',
            'handleNewSpriteClick',
            'targetsUpdate'
        ]);
        this.state = {
            backdropLibraryVisible: false,
            costumeLibraryVisible: false,
            spriteLibraryVisible: false,
            targets: {
                targetList: []
            }
        };
    }
    componentDidMount () {
        this.props.vm.on('targetsUpdate', this.targetsUpdate);
    }
    handleChange (event) {
        this.props.vm.setEditingTarget(event.target.value);
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
    targetsUpdate (data) {
        this.setState({targets: data});
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
                    sprites={this.state.targets.targetList.map(target => (
                        {
                            id: target[0],
                            name: target[1]
                        }
                    ))}
                    value={this.state.targets.editingTarget && [this.state.targets.editingTarget]}
                    onChange={this.handleChange}
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
