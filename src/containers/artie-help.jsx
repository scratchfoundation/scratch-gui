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
            'setBlocksDel',
            'setBlocksReplaceInputs',
            'setBlocksMisplaced'
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

        // Gets the workspace metrics
        const metrics = this.workspace.getMetrics();

        //If the help is not null and we have some blocks to add
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.addBlocks !== null){

            //We build the block array for the elements we have to add
            var addBlockArray = [];
            var dy = 10;
            var dx = -1;
            this.props.help.nextSteps.addBlocks.forEach(element => {addBlockArray.push(this.workspace.newBlock(element.blockName))});

            //Configure and render all the blocks
            addBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;

                //If we haven't set the center of the workspace
                if(dx == -1){

                    const {x, y} = block.getRelativeToSurfaceXY();
                    const ltrX = ((metrics.viewWidth / 2) - (block.width / 2) + 25);
                    const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                    dx = mirrorX - ltrX;
                    const midPoint = metrics.viewWidth / 2;

                    if (x === 0) {
                        // if it's the first time positioning, it should always move right
                        if (block.width < midPoint) {
                            dx = ltrX;
                        } else if (block.width < metrics.viewWidth) {
                            dx = midPoint - ((metrics.viewWidth - block.width) / 2);
                        } else {
                            dx = midPoint + (block.width - metrics.viewWidth);
                        }
                        this.setState({rtlOffset: block.getRelativeToSurfaceXY().x});
                    }
                    if (block.width > metrics.viewWidth) {
                        dx = dx + block.width - metrics.viewWidth;
                    }else {
                        dx = (metrics.viewWidth / 2) - (block.width / 2) - x;
                        // If the procedure declaration is wider than the view width,
                        // keep the right-hand side of the procedure in view.
                        if (block.width > metrics.viewWidth) {
                            dx = metrics.viewWidth - block.width - x;
                        }
                    }
                }

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

        // Gets the workspace metrics
        const metrics = this.workspace.getMetrics();

        //If the help is not null and we have some blocks to delete
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.deleteBlocks !== null){

            //We build the block array for the blocks we have to delete
            var delBlockArray = [];
            var dy = 10;
            var dx = -1;
            this.props.help.nextSteps.deleteBlocks.forEach(element => {delBlockArray.push(this.workspace.newBlock(element.blockName))});

            //Configure and render all the blocks
            delBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;

                //If we haven't set the center of the workspace
                if(dx == -1){

                    const {x, y} = block.getRelativeToSurfaceXY();
                    const ltrX = ((metrics.viewWidth / 2) - (block.width / 2) + 25);
                    const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                    dx = mirrorX - ltrX;
                    const midPoint = metrics.viewWidth / 2;

                    if (x === 0) {
                        // if it's the first time positioning, it should always move right
                        if (block.width < midPoint) {
                            dx = ltrX;
                        } else if (block.width < metrics.viewWidth) {
                            dx = midPoint - ((metrics.viewWidth - block.width) / 2);
                        } else {
                            dx = midPoint + (block.width - metrics.viewWidth);
                        }
                        this.setState({rtlOffset: block.getRelativeToSurfaceXY().x});
                    }
                    if (block.width > metrics.viewWidth) {
                        dx = dx + block.width - metrics.viewWidth;
                    }else {
                        dx = (metrics.viewWidth / 2) - (block.width / 2) - x;
                        // If the procedure declaration is wider than the view width,
                        // keep the right-hand side of the procedure in view.
                        if (block.width > metrics.viewWidth) {
                            dx = metrics.viewWidth - block.width - x;
                        }
                    }
                }

                block.moveBy(dx,dy);
                dy += 60;

                block.initSvg();
                block.render();
            });
        }
    }
    setBlocksReplaceInputs (blocksRef){
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

        // Gets the workspace metrics
        const metrics = this.workspace.getMetrics();

        //If the help is not null and we have some input values to replace
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.replaceInputs !== null){

            //We build the block array for the elements we have to replace
            var replaceBlockArray = [];
            var dy = 10;
            var dx = -1;
            this.props.help.nextSteps.replaceInputs.forEach(element => {replaceBlockArray.push(this.workspace.newBlock(element.element.blockName))});

            //Configure and render all the blocks
            replaceBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;

                //If we haven't set the center of the workspace
                if(dx == -1){

                    const {x, y} = block.getRelativeToSurfaceXY();
                    const ltrX = ((metrics.viewWidth / 2) - (block.width / 2) + 25);
                    const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                    dx = mirrorX - ltrX;
                    const midPoint = metrics.viewWidth / 2;

                    if (x === 0) {
                        // if it's the first time positioning, it should always move right
                        if (block.width < midPoint) {
                            dx = ltrX;
                        } else if (block.width < metrics.viewWidth) {
                            dx = midPoint - ((metrics.viewWidth - block.width) / 2);
                        } else {
                            dx = midPoint + (block.width - metrics.viewWidth);
                        }
                        this.setState({rtlOffset: block.getRelativeToSurfaceXY().x});
                    }
                    if (block.width > metrics.viewWidth) {
                        dx = dx + block.width - metrics.viewWidth;
                    }else {
                        dx = (metrics.viewWidth / 2) - (block.width / 2) - x;
                        // If the procedure declaration is wider than the view width,
                        // keep the right-hand side of the procedure in view.
                        if (block.width > metrics.viewWidth) {
                            dx = metrics.viewWidth - block.width - x;
                        }
                    }
                }

                block.moveBy(dx,dy);
                dy += 60;

                block.initSvg();
                block.render();
            });
        }
    }
    setBlocksMisplaced (blocksRef){
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

        // Gets the workspace metrics
        const metrics = this.workspace.getMetrics();

        //If the help is not null and we have some misplaced blocks
        if(this.props.help !== null && this.props.help.nextSteps !== null && this.props.help.nextSteps.replacePositions !== null){

            //We build the block array for the elements we have to add
            var misplacedBlockArray = [];
            var dy = 10;
            var dx = -1;
            this.props.help.nextSteps.replacePositions.forEach(element => {misplacedBlockArray.push(this.workspace.newBlock(element.blockName))});

            //Configure and render all the blocks
            misplacedBlockArray.forEach(block => {
                block.setMovable(false);
                block.setDeletable(false);
                block.contextMenu = false;

                //If we haven't set the center of the workspace
                if(dx == -1){

                    const {x, y} = block.getRelativeToSurfaceXY();
                    const ltrX = ((metrics.viewWidth / 2) - (block.width / 2) + 25);
                    const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                    dx = mirrorX - ltrX;
                    const midPoint = metrics.viewWidth / 2;

                    if (x === 0) {
                        // if it's the first time positioning, it should always move right
                        if (block.width < midPoint) {
                            dx = ltrX;
                        } else if (block.width < metrics.viewWidth) {
                            dx = midPoint - ((metrics.viewWidth - block.width) / 2);
                        } else {
                            dx = midPoint + (block.width - metrics.viewWidth);
                        }
                        this.setState({rtlOffset: block.getRelativeToSurfaceXY().x});
                    }
                    if (block.width > metrics.viewWidth) {
                        dx = dx + block.width - metrics.viewWidth;
                    }else {
                        dx = (metrics.viewWidth / 2) - (block.width / 2) - x;
                        // If the procedure declaration is wider than the view width,
                        // keep the right-hand side of the procedure in view.
                        if (block.width > metrics.viewWidth) {
                            dx = metrics.viewWidth - block.width - x;
                        }
                    }
                }

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

        if(this.props.artieLogin !== null && this.props.artieLogin !== undefined && this.props.artieLogin.user !== null &&
           this.props.artieExercises !== null && this.props.artieExercises !== null && this.props.artieExercises.help !== null &&
           (this.props.artieExercises.help.nextSteps !== null || this.props.artieExercises.help.totalDistance === 0))
        {
            return (
                <ArtieHelpComponent
                    help={this.props.help}
                    componentRefAdd={this.setBlocksAdd}
                    componentRefDel={this.setBlocksDel}
                    componentRefReplace={this.setBlocksReplaceInputs}
                    componentRefMisplaced={this.setBlocksMisplaced}
                    warp={this.state.warp}
                    onAddBoolean={this.handleAddBoolean}
                    onAddLabel={this.handleAddLabel}
                    onAddTextNumber={this.handleAddTextNumber}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    onToggleWarp={this.handleToggleWarp}
                />
            );
        }else{
            return null;
        }
    }
}

ArtieHelp.propTypes = {
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    artieLogin: PropTypes.object,
    artieExercises: PropTypes.object,
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
