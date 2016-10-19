const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');

const Blocks = require('./blocks');
const GUIComponent = require('../components/gui');
const GreenFlag = require('./green-flag');
const SpriteSelector = require('./sprite-selector');
const Stage = require('./stage');
const StopAll = require('./stop-all');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        this.vmManager = new VMManager(this.props.vm);
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
        return (
            <GUIComponent {... guiProps}>
                <GreenFlag vm={vm} {...greenFlagProps} />
                <StopAll vm={vm} {...stopAllProps} />
                <Stage vm={vm} {...stageProps} />
                <SpriteSelector vm={vm} {... spriteSelectorProps} />
                <Blocks vm={vm} {... blocksProps} />
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    basePath: React.PropTypes.string,
    blocksProps: React.PropTypes.object,
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
