import bindAll from "lodash.bindall";
import PropTypes from "prop-types"
import React from "react";
import VM from 'scratch-vm'
import { connect } from 'react-redux'

import { surrender, answer, next } from "../reducers/workbook.js"
import WorkbookAnswerComponent from "../components/workbook-answer/workbook-answer.jsx"

class WorkbookAnswer extends React.Component {
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
                onAnswerClick={onAnswer}
                onSurrenderClick={onSurrender}
                onNextClick={onNext}
            />
        );
    }
}

WorkbookAnswer.propTypes = {
    description: PropTypes.string,
    vm: PropTypes.instanceOf(VM),
    isAnswering: PropTypes.bool.isRequired,
    onSurrender: PropTypes.func.isRequired,
    onAnswer: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAnswering: state.scratchGui.workbook.answering,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSurrender: e => {
        e.preventDefault();
        dispatch(surrender());
    },
    onAnswer: e => {
        e.preventDefault();
        const targets = ownProps.vm.runtime.executableTargets;
        for (let t = targets.length - 1; t >= 0; t--) {
            const target = targets[t];
            const scripts = target.blocks.getScripts();
            for (let j = 0; j < scripts.length; j++) {
                const topBlockId = scripts[j];
                ownProps.vm.runtime.toggleScript(topBlockId, {stackClick: true});
            }
        }
        dispatch(answer());
    },
    onNext: e => {
        e.preventDefault();
        dispatch(next());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkbookAnswer);
