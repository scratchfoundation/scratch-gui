const bindAll = require('lodash.bindall');
const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const ScratchBlocks = require('scratch-blocks');
const VM = require('scratch-vm');

const BlocksComponent = require('../components/blocks/blocks.jsx');

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'attachVM',
            'detachVM',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'onVisualReport',
            'onWorkspaceUpdate',
            'setBlocks'
        ]);
    }
    componentDidMount () {
        const workspaceConfig = defaultsDeep({}, Blocks.defaultOptions, this.props.options);
        this.workspace = ScratchBlocks.inject(this.blocks, workspaceConfig);
        this.attachVM();
    }
    componentWillUnmount () {
        this.detachVM();
        this.workspace.dispose();
    }
    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.workspace
            .getFlyout()
            .getWorkspace()
            .addChangeListener(this.props.vm.flyoutBlockListener);
        this.props.vm.on('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.on('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.on('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.on('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.on('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.on('workspaceUpdate', this.onWorkspaceUpdate);
    }
    detachVM () {
        this.props.vm.off('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.off('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.off('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.off('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.off('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.off('workspaceUpdate', this.onWorkspaceUpdate);
    }
    onScriptGlowOn (data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff (data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn (data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff (data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport (data) {
        this.workspace.reportValue(data.id, data.value);
    }
    onWorkspaceUpdate (data) {
        ScratchBlocks.Events.disable();
        this.workspace.clear();
        const dom = ScratchBlocks.Xml.textToDom(data.xml);
        ScratchBlocks.Xml.domToWorkspace(dom, this.workspace);
        ScratchBlocks.Events.enable();
    }
    setBlocks (blocks) {
        this.blocks = blocks;
    }
    render () {
        const {
            options, // eslint-disable-line no-unused-vars
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <BlocksComponent
                componentRef={this.setBlocks}
                {...props}
            />
        );
    }
}

Blocks.propTypes = {
    options: React.PropTypes.shape({
        media: React.PropTypes.string,
        zoom: React.PropTypes.shape({
            controls: React.PropTypes.boolean,
            wheel: React.PropTypes.boolean,
            startScale: React.PropTypes.number
        }),
        colours: React.PropTypes.shape({
            workspace: React.PropTypes.string,
            flyout: React.PropTypes.string,
            scrollbar: React.PropTypes.string,
            scrollbarHover: React.PropTypes.string,
            insertionMarker: React.PropTypes.string,
            insertionMarkerOpacity: React.PropTypes.number,
            fieldShadow: React.PropTypes.string,
            dragShadowOpacity: React.PropTypes.number
        })
    }),
    vm: React.PropTypes.instanceOf(VM)
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75
    },
    colours: {
        workspace: '#334771',
        flyout: '#283856',
        scrollbar: '#24324D',
        scrollbarHover: '#0C111A',
        insertionMarker: '#FFFFFF',
        insertionMarkerOpacity: 0.3,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    }
};

Blocks.defaultProps = {
    options: Blocks.defaultOptions,
    vm: new VM()
};

module.exports = Blocks;
