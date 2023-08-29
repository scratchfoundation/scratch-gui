import bindAll from "lodash.bindall";
import PropTypes from "prop-types"
import React from "react";
import VM from 'scratch-vm'
import makeToolboxXML from '../lib/make-toolbox-xml';

import { connect } from 'react-redux'
import { surrender, answer, next } from "../reducers/workbook.js"
import { updateToolbox } from "../reducers/toolbox.js"
import WorkbookAnswerComponent from "../components/workbook-answer/workbook-answer.jsx"

class WorkbookAnswer extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onAnswerClick',
            'onSurrenderClick',
            'onNextClick',
        ]);
    }
    onAnswerClick (e) {
        e.preventDefault();

        const targets = this.props.vm.runtime.executableTargets;
        for (let t = targets.length - 1; t >= 0; t--) {
            const target = targets[t];
            const scripts = target.blocks.getScripts();
            for (let j = 0; j < scripts.length; j++) {
                const topBlockId = scripts[j];
                this.props.vm.runtime.toggleScript(topBlockId, {stackClick: true});
            }
        }

        this.props.onAnswer();
    }
    onSurrenderClick (e) {
        e.preventDefault();
        this.props.onSurrender();
    }
    onNextClick (e) {
        e.preventDefault();
        this.props.onNext();

        const toolboxXML = this.getToolboxXML();
        this.props.updateToolboxState(toolboxXML);
    }
    getToolboxXML () {
        // Use try/catch because this requires digging pretty deep into the VM
        // Code inside intentionally ignores several error situations (no stage, etc.)
        // Because they would get caught by this try/catch
        try {
            let {editingTarget: target, runtime} = this.props.vm;
            const stage = runtime.getTargetForStage();
            if (!target) target = stage; // If no editingTarget, use the stage
            return makeToolboxXML(false, target.isStage, target.id, undefined, undefined, undefined, undefined, undefined, this.props.toolboxBlocksVisibilities);
        } catch (e) {
            return null;
        }
    }
    render() {
        const {
            description,
            isAnswering,
            onSurrender,
            onAnswer,
            onNext,
            ...props
        } = this.props;

        return (
            <WorkbookAnswerComponent
                {...props}
                description={description}
                isAnswering={isAnswering}
                onAnswerClick={this.onAnswerClick}
                onSurrenderClick={this.onSurrenderClick}
                onNextClick={this.onNextClick}
            />
        );
    }
}

WorkbookAnswer.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired,
    questionIndex: PropTypes.number.isRequired,
    isAnswering: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    onSurrender: PropTypes.func.isRequired,
    onAnswer: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    toolboxBlocksVisibilities: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    questionIndex: state.scratchGui.workbook.questionIndex,
    isAnswering: state.scratchGui.workbook.answering,
    description: state.scratchGui.workbook.question.explanation,
    toolboxBlocksVisibilities: state.scratchGui.workbook.question.toolboxBlocks ?? {},
});

const mapDispatchToProps = (dispatch) => ({
    onSurrender: () => {
        dispatch(surrender());
    },
    onAnswer: () => {
        dispatch(answer());
    },
    onNext: () => {
        dispatch(next());
    },
    updateToolboxState: (toolboxXML) => {
        dispatch(updateToolbox(toolboxXML));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkbookAnswer);
