import bindAll from "lodash.bindall";
import PropTypes from "prop-types"
import React from "react";
import VM from 'scratch-vm'

import { connect } from 'react-redux'
import { surrender, answer, next } from "../reducers/workbook.js"
import { updateToolbox } from "../reducers/toolbox.js"
import WorkbookAnswerComponent from "../components/workbook-answer/workbook-answer.jsx"
import randomizeSpritePosition from '../lib/randomize-sprite-position';
import spriteLibraryContent from '../lib/libraries/sprites.json';

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

        this.removeAllSprites();
        this.addQuestionSprites();

        this.props.onNext();
    }
    removeAllSprites () {
        for (const id of Object.keys(this.props.sprites)) {
            this.props.vm.deleteSprite(id);
        }
    }
    addQuestionSprites () {
        if (this.props.nextQuestionSprites.length <= 0) return;

        // Select a sprite who will be added first.
        const targetName = this.props.nextQuestionSprites[0].name;

        for (const spriteInfo of this.props.nextQuestionSprites) {
            const name = spriteInfo.name;
            const item = spriteLibraryContent.find(sprite => sprite.name === name);
            randomizeSpritePosition(item);
            item.x = spriteInfo.x ?? item.x;
            item.y = spriteInfo.y ?? item.y;
            this.props.vm.addSprite(JSON.stringify(item)).then(() => {
                const target = Object.values(this.props.sprites).find(sprite => sprite.name === targetName);
                if (target) {
                    this.props.vm.setEditingTarget(target.id);
                }
            });
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
    sprites: PropTypes.object,
    nextQuestionSprites: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => ({
    questionIndex: state.scratchGui.workbook.questionIndex,
    isAnswering: state.scratchGui.workbook.answering,
    description: state.scratchGui.workbook.question.explanation,
    toolboxBlocksVisibilities: state.scratchGui.workbook.question.toolboxBlocks ?? {},
    nextQuestionSprites: state.scratchGui.workbook.nextQuestion?.sprites ?? [],
    sprites: state.scratchGui.targets.sprites,
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
