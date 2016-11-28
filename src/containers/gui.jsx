const bindAll = require('lodash.bindall');
const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');
const MediaLibrary = require('../lib/media-library');
const shapeFromPropTypes = require('../lib/shape-from-prop-types');

const Blocks = require('./blocks.jsx');
const GUIComponent = require('../components/gui.jsx');
const GreenFlag = require('./green-flag.jsx');
const SpriteSelector = require('./sprite-selector.jsx');
const Stage = require('./stage.jsx');
const StopAll = require('./stop-all.jsx');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['closeModal']);
        this.vmManager = new VMManager(this.props.vm);
        this.state = {currentModal: null};
    }
    componentDidMount () {
        this.vmManager.attachKeyboardEvents();
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.start();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    componentWillUnmount () {
        this.vmManager.detachKeyboardEvents();
        this.props.vm.stopAll();
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
            mediaLibrary,
            projectData, // eslint-disable-line no-unused-vars
            spriteSelectorProps,
            stageProps,
            stopAllProps,
            vm,
            ...guiProps
        } = this.props;
        blocksProps = defaultsDeep({}, blocksProps, {
            options: {
                media: `${basePath}static/blocks-media/`
            }
        });
        if (this.props.children) {
            return (
                <GUIComponent {... guiProps}>
                    {this.props.children}
                </GUIComponent>
            );
        }
        return (
            <GUIComponent {... guiProps}>
                <GreenFlag
                    vm={vm}
                    {...greenFlagProps}
                />
                <StopAll
                    vm={vm}
                    {...stopAllProps}
                />
                <Stage
                    vm={vm}
                    {...stageProps}
                />
                <SpriteSelector
                    mediaLibrary={mediaLibrary}
                    vm={vm}
                    {... spriteSelectorProps}
                />
                <Blocks
                    vm={vm}
                    {... blocksProps}
                />
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    basePath: React.PropTypes.string,
    blocksProps: shapeFromPropTypes(Blocks.propTypes, {omit: ['vm']}),
    children: React.PropTypes.node,
    greenFlagProps: shapeFromPropTypes(GreenFlag.propTypes, {omit: ['vm']}),
    mediaLibrary: React.PropTypes.instanceOf(MediaLibrary),
    projectData: React.PropTypes.string,
    spriteSelectorProps: shapeFromPropTypes(SpriteSelector.propTypes, {omit: ['vm']}),
    stageProps: shapeFromPropTypes(Stage.propTypes, {omit: ['vm']}),
    stopAllProps: shapeFromPropTypes(StopAll.propTypes, {omit: ['vm']}),
    vm: React.PropTypes.instanceOf(VM)
};

GUI.defaultProps = {
    basePath: '/',
    blocksProps: {},
    greenFlagProps: {},
    mediaLibrary: new MediaLibrary(),
    spriteSelectorProps: {},
    stageProps: {},
    stopAllProps: {},
    vm: new VM()
};

module.exports = GUI;
