const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');
const MediaLibrary = require('../lib/media-library');

const Blocks = require('./blocks');
const GUIComponent = require('../components/gui');
const GreenFlag = require('./green-flag');
const SpriteSelector = require('./sprite-selector');
const Stage = require('./stage');
const StopAll = require('./stop-all');

const SpriteLibrary = require('./sprite-library');
const CostumeLibrary = require('./costume-library');
const BackdropLibrary = require('./backdrop-library');

class GUI extends React.Component {
    constructor (props) {
        super(props);
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
            basePath,
            blocksProps,
            greenFlagProps,
            projectData, // eslint-disable-line no-unused-vars
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
<SpriteLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'sprite-library'}
                    key='sprite-library' />
                <CostumeLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'costume-library'}
                    key='costume-library' />
                <BackdropLibrary
                    vm={this.props.vm}
                    mediaLibrary={this.mediaLibrary}
                    onRequestClose={this.closeModal.bind(this)}
                    visible={this.state.currentModal == 'backdrop-library'}
                    key='backdrop-library' />
                </GUIComponent>
            );
        }
    }
}

GUI.propTypes = {
    basePath: React.PropTypes.string,
    blocksProps: React.PropTypes.object,
    children: React.PropTypes.node,
    greenFlagProps: React.PropTypes.object,
    projectData: React.PropTypes.string,
    spriteSelectorProps: React.PropTypes.object,
    stageProps: React.PropTypes.object,
    stopAllProps: React.PropTypes.object,
    vm: React.PropTypes.object,
};

GUI.defaultProps = {
    basePath: '/',
    blocksProps: {},
    greenFlagProps: {},
    spriteSelectorProps: {},
    stageProps: {},
    stopAllProps: {},
    vm: new VM()
};

module.exports = GUI;
