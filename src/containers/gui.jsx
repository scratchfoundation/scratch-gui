const bindAll = require('lodash.bindall');
const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');
const MediaLibrary = require('../lib/media-library');

const Blocks = require('./blocks.jsx');
const GUIComponent = require('../components/gui.jsx');
const GreenFlag = require('./green-flag.jsx');
const SpriteSelector = require('./sprite-selector.jsx');
const Stage = require('./stage.jsx');
const StopAll = require('./stop-all.jsx');

const SpriteLibrary = require('./sprite-library.jsx');
const CostumeLibrary = require('./costume-library.jsx');
const BackdropLibrary = require('./backdrop-library.jsx');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['closeModal']);
        this.vmManager = new VMManager(this.props.vm);
        this.mediaLibrary = new MediaLibrary();
        this.state = {currentModal: null};
    }
    componentDidMount () {
        this.vmManager.attachKeyboardEvents();
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.start();
    }
    componentWillUnmount () {
        this.vmManager.detachKeyboardEvents();
        this.props.vm.stopAll();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    openModal (modalName) {
        this.setState({currentModal: modalName});
    }
    closeModal () {
        this.setState({currentModal: null});
    }
    render () {
        let {
            backdropLibraryProps,
            basePath,
            blocksProps,
            costumeLibraryProps,
            greenFlagProps,
            projectData, // eslint-disable-line no-unused-vars
            spriteLibraryProps,
            spriteSelectorProps,
            stageProps,
            stopAllProps,
            vm,
            ...guiProps
        } = this.props;
        blocksProps = defaultsDeep({}, blocksProps, {
            options: {
                media: basePath + 'static/blocks-media/'
            }
        });
        spriteSelectorProps = defaultsDeep({}, spriteSelectorProps, {
            openNewBackdrop: () => this.openModal('backdrop-library'),
            openNewCostume: () => this.openModal('costume-library'),
            openNewSprite: () => this.openModal('sprite-library')
        });
        spriteLibraryProps = defaultsDeep({}, spriteLibraryProps, {
            mediaLibrary: this.mediaLibrary,
            onRequestClose: this.closeModal,
            visible: this.state.currentModal == 'sprite-library'
        });
        costumeLibraryProps = defaultsDeep({}, costumeLibraryProps, {
            mediaLibrary: this.mediaLibrary,
            onRequestClose: this.closeModal,
            visible: this.state.currentModal == 'costume-library'
        });
        backdropLibraryProps = defaultsDeep({}, backdropLibraryProps, {
            mediaLibrary: this.mediaLibrary,
            onRequestClose: this.closeModal,
            visible: this.state.currentModal == 'backdrop-library'
        });
        if (this.props.children) {
            return (
                <GUIComponent {... guiProps}>
                    {this.props.children}
                </GUIComponent>
            );
        } else {
            return (
                <GUIComponent {... guiProps}>
                    <GreenFlag vm={vm} {...greenFlagProps} />
                    <StopAll vm={vm} {...stopAllProps} />
                    <Stage vm={vm} {...stageProps} />
                    <SpriteSelector vm={vm} {... spriteSelectorProps} />
                    <Blocks vm={vm} {... blocksProps} />
                    <SpriteLibrary vm={vm} {...spriteLibraryProps} />
                    <CostumeLibrary vm={vm} {...costumeLibraryProps} />
                    <BackdropLibrary vm={vm} {...backdropLibraryProps} />
                </GUIComponent>
            );
        }
    }
}

GUI.propTypes = {
    backdropLibraryProps: React.PropTypes.object,
    basePath: React.PropTypes.string,
    blocksProps: React.PropTypes.object,
    costumeLibraryProps: React.PropTypes.object,
    children: React.PropTypes.node,
    greenFlagProps: React.PropTypes.object,
    projectData: React.PropTypes.string,
    spriteLibraryProps: React.PropTypes.object,
    spriteSelectorProps: React.PropTypes.object,
    stageProps: React.PropTypes.object,
    stopAllProps: React.PropTypes.object,
    vm: React.PropTypes.object,
};

GUI.defaultProps = {
    backdropLibraryProps: {},
    basePath: '/',
    blocksProps: {},
    costumeLibraryProps: {},
    greenFlagProps: {},
    spriteSelectorProps: {},
    spriteLibraryProps: {},
    stageProps: {},
    stopAllProps: {},
    vm: new VM()
};

module.exports = GUI;
