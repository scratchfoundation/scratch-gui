import bindAll from 'lodash.bindall';
import defaultsDeep from 'lodash.defaultsdeep';
import PropTypes from 'prop-types';
import React from 'react';
import ArtieHelpComponent from '../components/artie-help/artie-help.jsx';
import ScratchBlocks from 'scratch-blocks';
import {connect} from 'react-redux';
//import GreenFlag from '../components/green-flag/green-flag.svg';

class ArtieHelp extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAddLabel',
            'handleAddBoolean',
            'handleAddTextNumber',
            'handleToggleWarp',
            'handleCancel',
            'handleOk',
            'setBlocksAdd',
            'setBlocksDel'
        ]);
        this.state = {
            rtlOffset: 0,
            warp: false
        };
    }
    componentWillUnmount () {
        if (this.workspace) {
            this.workspace.dispose();
        }
    }
    setBlocksAdd (blocksRef) {
        if (!blocksRef) return;
        this.blocks = blocksRef;
        const workspaceConfig = defaultsDeep({},
            ArtieHelp.defaultOptions,
            this.props.options,
            {rtl: this.props.isRtl}
        );

        // @todo This is a hack to make there be no toolbox.
        const oldDefaultToolbox = ScratchBlocks.Blocks.defaultToolbox;
        ScratchBlocks.Blocks.defaultToolbox = null;
        this.workspace = ScratchBlocks.inject(this.blocks, workspaceConfig);
        ScratchBlocks.Blocks.defaultToolbox = oldDefaultToolbox;

        this.workspace.options.pathToMedia = 'static/blocks-media/';

        //If the help is not null and we have some blocks to add
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.addElements !== null){

            //We build the block array for the elements we have to add
            var addBlockArray = [];
            var dy = 0;
            const dx = 0;
            this.props.help.nextSteps.addElements.forEach(element => {addBlockArray.push(this.workspace.newBlock(element.elementName))});

            //Configure and render all the blocks
            addBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;
                block.moveBy(dx,dy);
                dy += 60;

                block.initSvg();
                block.render();
            });
        }
    }
    setBlocksDel (blocksRef) {
        if (!blocksRef) return;
        this.blocks = blocksRef;
        const workspaceConfig = defaultsDeep({},
            ArtieHelp.defaultOptions,
            this.props.options,
            {rtl: this.props.isRtl}
        );

        // @todo This is a hack to make there be no toolbox.
        const oldDefaultToolbox = ScratchBlocks.Blocks.defaultToolbox;
        ScratchBlocks.Blocks.defaultToolbox = null;
        this.workspace = ScratchBlocks.inject(this.blocks, workspaceConfig);
        ScratchBlocks.Blocks.defaultToolbox = oldDefaultToolbox;

        this.workspace.options.pathToMedia = 'static/blocks-media/';

        //If the help is not null and we have some blocks to add
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.addElements !== null){

            //We build the block array for the elements we have to delete
            var delBlockArray = [];
            var dy = 0;
            const dx = 0;
            this.props.help.nextSteps.deleteElements.forEach(element => {delBlockArray.push(this.workspace.newBlock(element.elementName))});

            //Configure and render all the blocks
            delBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;
                block.moveBy(dx,dy);
                dy += 60;

                block.initSvg();
                block.render();
            });
        }
    }
    handleCancel () {
        this.props.onRequestClose();
    }
    handleOk () {
        const newMutation = this.mutationRoot ? this.mutationRoot.mutationToDom(true) : null;
        this.props.onRequestClose(newMutation);
    }
    handleAddLabel () {
        if (this.mutationRoot) {
            this.mutationRoot.addLabelExternal();
        }
    }
    handleAddBoolean () {
        if (this.mutationRoot) {
            this.mutationRoot.addBooleanExternal();
        }
    }
    handleAddTextNumber () {
        if (this.mutationRoot) {
            this.mutationRoot.addStringNumberExternal();
        }
    }
    handleToggleWarp () {
        if (this.mutationRoot) {
            const newWarp = !this.mutationRoot.getWarp();
            this.mutationRoot.setWarp(newWarp);
            this.setState({warp: newWarp});
        }
    }
    render () {
        return (
            <ArtieHelpComponent
                componentRefAdd={this.setBlocksAdd}
                componentRefDel={this.setBlocksDel}
                warp={this.state.warp}
                onAddBoolean={this.handleAddBoolean}
                onAddLabel={this.handleAddLabel}
                onAddTextNumber={this.handleAddTextNumber}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                onToggleWarp={this.handleToggleWarp}
            />
        );
    }
}

ArtieHelp.propTypes = {
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        comments: PropTypes.bool,
        collapse: PropTypes.bool
    })
};

ArtieHelp.defaultOptions = {
    zoom: {
        controls: false,
        wheel: false,
        startScale: 0.9
    },
    comments: false,
    collapse: false,
    scrollbars: true
};

ArtieHelp.defaultProps = {
    options: ArtieHelp.defaultOptions
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl
});

export default connect(
    mapStateToProps
)(ArtieHelp);
