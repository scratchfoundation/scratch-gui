import bindAll from 'lodash.bindall';
import debounce from 'lodash.debounce';
import defaultsDeep from 'lodash.defaultsdeep';
import makeToolboxXML from '../lib/make-toolbox-xml';
import PropTypes from 'prop-types';
import React from 'react';
import VMScratchBlocks from '../lib/blocks';
import VM from 'scratch-vm';
import Prompt from './prompt.jsx';
import BlocksComponent from '../components/blocks/blocks.jsx';

import {connect} from 'react-redux';
import {updateToolbox} from '../reducers/toolbox';
import {activateColorPicker} from '../reducers/color-picker';

const addFunctionListener = (object, property, callback) => {
    const oldFn = object[property];
    object[property] = function () {
        const result = oldFn.apply(this, arguments);
        callback.apply(this, result);
        return result;
    };
};

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        this.ScratchBlocks = VMScratchBlocks(props.vm);
        bindAll(this, [
            'attachVM',
            'detachVM',
            'handlePromptStart',
            'handlePromptCallback',
            'handlePromptClose',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'handleExtensionAdded',
            'onTargetsUpdate',
            'onVisualReport',
            'onWorkspaceUpdate',
            'onWorkspaceMetricsChange',
            'setBlocks'
        ]);
        this.ScratchBlocks.prompt = this.handlePromptStart;
        this.state = {
            workspaceMetrics: {},
            prompt: null
        };
        this.onTargetsUpdate = debounce(this.onTargetsUpdate, 100);
    }
    componentDidMount () {
        this.ScratchBlocks.FieldColourSlider.activateEyedropper_ = this.props.onActivateColorPicker;

        const workspaceConfig = defaultsDeep({}, Blocks.defaultOptions, this.props.options);
        this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);

        // Load the toolbox from the GUI (otherwise we get the scratch-blocks default toolbox)
        this.workspace.updateToolbox(this.props.toolboxXML);

        // @todo change this when blockly supports UI events
        addFunctionListener(this.workspace, 'translate', this.onWorkspaceMetricsChange);
        addFunctionListener(this.workspace, 'zoom', this.onWorkspaceMetricsChange);

        this.attachVM();
    }
    shouldComponentUpdate (nextProps, nextState) {
        return (
            this.state.prompt !== nextState.prompt ||
            this.props.isVisible !== nextProps.isVisible ||
            this.props.toolboxXML !== nextProps.toolboxXML
        );
    }
    componentDidUpdate (prevProps) {
        if (prevProps.toolboxXML !== this.props.toolboxXML) {
            const selectedCategoryName = this.workspace.toolbox_.getSelectedItem().name_;
            this.workspace.updateToolbox(this.props.toolboxXML);
            // Blockly throws if we don't select a category after updating the toolbox.
            /** @TODO Find a way to avoid the exception without accessing private properties. */
            this.setToolboxSelectedItemByName(selectedCategoryName);
        }
        if (this.props.isVisible === prevProps.isVisible) {
            return;
        }

        // @todo hack to resize blockly manually in case resize happened while hidden
        // @todo hack to reload the workspace due to gui bug #413
        if (this.props.isVisible) { // Scripts tab
            this.workspace.setVisible(true);
            this.props.vm.refreshWorkspace();
            window.dispatchEvent(new Event('resize'));
            this.workspace.toolbox_.refreshSelection();
        } else {
            this.workspace.setVisible(false);
        }
    }
    componentWillUnmount () {
        this.detachVM();
        this.workspace.dispose();
    }
    /**
     * Select a particular category in the toolbox by specifying the category name.
     * This is a workaround for a bug: @see {@link componentDidUpdate} above.
     * @TODO Remove this or reimplement using only public APIs.
     * @param {string} name - the name of the category to select.
     */
    setToolboxSelectedItemByName (name) {
        const categories = this.workspace.toolbox_.categoryMenu_.categories_;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name_ === name) {
                this.workspace.toolbox_.setSelectedItem(categories[i]);
            }
        }
    }
    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace
            .getFlyout()
            .getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.addListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.addListener('EXTENSION_ADDED', this.handleExtensionAdded);
    }
    detachVM () {
        this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.removeListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.removeListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.removeListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.removeListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.removeListener('EXTENSION_ADDED', this.handleExtensionAdded);
    }
    updateToolboxBlockValue (id, value) {
        const block = this.workspace
            .getFlyout()
            .getWorkspace()
            .getBlockById(id);
        if (block) {
            block.inputList[0].fieldRow[0].setValue(value);
        }
    }
    onTargetsUpdate () {
        if (this.props.vm.editingTarget) {
            ['glide', 'move', 'set'].forEach(prefix => {
                this.updateToolboxBlockValue(`${prefix}x`, this.props.vm.editingTarget.x.toFixed(0));
                this.updateToolboxBlockValue(`${prefix}y`, this.props.vm.editingTarget.y.toFixed(0));
            });
        }
    }
    onWorkspaceMetricsChange () {
        const target = this.props.vm.editingTarget;
        if (target && target.id) {
            const workspaceMetrics = Object.assign({}, this.state.workspaceMetrics, {
                [target.id]: {
                    scrollX: this.workspace.scrollX,
                    scrollY: this.workspace.scrollY,
                    scale: this.workspace.scale
                }
            });
            this.setState({workspaceMetrics});
        }
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
        if (this.props.vm.editingTarget && !this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            this.onWorkspaceMetricsChange();
        }

        this.ScratchBlocks.Events.disable();
        this.workspace.clear();

        const dom = this.ScratchBlocks.Xml.textToDom(data.xml);
        this.ScratchBlocks.Xml.domToWorkspace(dom, this.workspace);
        this.ScratchBlocks.Events.enable();
        this.workspace.toolbox_.refreshSelection();

        if (this.props.vm.editingTarget && this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            const {scrollX, scrollY, scale} = this.state.workspaceMetrics[this.props.vm.editingTarget.id];
            this.workspace.scrollX = scrollX;
            this.workspace.scrollY = scrollY;
            this.workspace.scale = scale;
            this.workspace.resize();
        }
    }
    handleExtensionAdded (blocksInfo) {
        this.ScratchBlocks.defineBlocksWithJsonArray(blocksInfo.map(blockInfo => blockInfo.json));
        const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML();
        const toolboxXML = makeToolboxXML(dynamicBlocksXML);
        this.props.onExtensionAdded(toolboxXML);
        const categoryName = blocksInfo[0].json.category;
        this.workspace.toolbox_.setSelectedCategoryByName(categoryName);
    }
    setBlocks (blocks) {
        this.blocks = blocks;
    }
    handlePromptStart (message, defaultValue, callback) {
        this.setState({prompt: {callback, message, defaultValue}});
    }
    handlePromptCallback (data) {
        this.state.prompt.callback(data);
        this.handlePromptClose();
    }
    handlePromptClose () {
        this.setState({prompt: null});
    }
    render () {
        /* eslint-disable no-unused-vars */
        const {
            options,
            vm,
            isVisible,
            onActivateColorPicker,
            onExtensionAdded,
            toolboxXML,
            ...props
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <div>
                <BlocksComponent
                    componentRef={this.setBlocks}
                    {...props}
                />
                {this.state.prompt ? (
                    <Prompt
                        label={this.state.prompt.message}
                        placeholder={this.state.prompt.defaultValue}
                        title="New Variable" // @todo the only prompt is for new variables
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
            </div>
        );
    }
}

Blocks.propTypes = {
    isVisible: PropTypes.bool,
    onActivateColorPicker: PropTypes.func,
    onExtensionAdded: PropTypes.func,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        colours: PropTypes.shape({
            workspace: PropTypes.string,
            flyout: PropTypes.string,
            toolbox: PropTypes.string,
            toolboxSelected: PropTypes.string,
            scrollbar: PropTypes.string,
            scrollbarHover: PropTypes.string,
            insertionMarker: PropTypes.string,
            insertionMarkerOpacity: PropTypes.number,
            fieldShadow: PropTypes.string,
            dragShadowOpacity: PropTypes.number
        }),
        comments: PropTypes.bool
    }),
    toolboxXML: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.675
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: false
};

Blocks.defaultProps = {
    isVisible: true,
    options: Blocks.defaultOptions
};

const mapStateToProps = state => ({
    toolboxXML: state.toolbox.toolboxXML
});

const mapDispatchToProps = dispatch => ({
    onActivateColorPicker: callback => dispatch(activateColorPicker(callback)),
    onExtensionAdded: toolboxXML => {
        dispatch(updateToolbox(toolboxXML));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blocks);
