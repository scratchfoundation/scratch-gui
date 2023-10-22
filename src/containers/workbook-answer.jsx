import bindAll from "lodash.bindall";
import PropTypes from "prop-types"
import React from "react";
import VM from 'scratch-vm'

import { connect } from 'react-redux'
import { surrender, answer, next } from "../reducers/workbook.js"
import { updateToolbox } from "../reducers/toolbox.js"
import WorkbookAnswerComponent from "../components/workbook-answer/workbook-answer.jsx"
import randomizeSpritePosition from '../lib/randomize-sprite-position';

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

        this.__deleteAllSprites();
        this.__addMouseSprite();

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
    // TODO: 👀 add mouse sprite
    __addMouseSprite() {
        const item = {
            "name": "Mouse1",
            "tags": [
                "animals",
                "mammals",
                "rodents"
            ],
            "isStage": false,
            "variables": {},
            "costumes": [
                {
                    "assetId": "c5f76b65e30075c12d49ea8a8f7d6bad",
                    "name": "mouse1-a",
                    "bitmapResolution": 1,
                    "md5ext": "c5f76b65e30075c12d49ea8a8f7d6bad.svg",
                    "dataFormat": "svg",
                    "rotationCenterX": 50,
                    "rotationCenterY": 27
                },
                {
                    "assetId": "8a7da35c473972f88896ca73b7df2188",
                    "name": "mouse1-b",
                    "bitmapResolution": 1,
                    "md5ext": "8a7da35c473972f88896ca73b7df2188.svg",
                    "dataFormat": "svg",
                    "rotationCenterX": 65,
                    "rotationCenterY": 21
                }
            ],
            "sounds": [
                {
                    "assetId": "83a9787d4cb6f3b7632b4ddfebf74367",
                    "name": "pop",
                    "dataFormat": "wav",
                    "format": "",
                    "rate": 44100,
                    "sampleCount": 1032,
                    "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
                }
            ],
            "blocks": {}
        }
        randomizeSpritePosition(item);
        this.props.vm.addSprite(JSON.stringify(item)).then(() => {
            // this.props.onActivateBlocksTab();
        });
    }
    // TODO: 👀 remove all sprites
    __deleteAllSprites () {
        // TODO: 👀 
        console.log("@@@ __deleteAllSprites");
        console.log("this.props.sprites: ", this.props.sprites);

        for (const id of Object.keys(this.props.sprites)) {
            const restoreSprite = this.props.vm.deleteSprite(id);
            console.log("restoreSprite: ", restoreSprite);
            // const restoreFun = () => restoreSprite().then(this.handleActivateBlocksTab);
    
            // this.props.dispatchUpdateRestore({
            //     restoreFun: restoreFun,
            //     deletedItem: 'Sprite'
            // });
        }
    }
    onSurrenderClick (e) {
        e.preventDefault();
        this.props.onSurrender();
    }
    onNextClick (e) {
        e.preventDefault();
        this.props.onNext();
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
}

const mapStateToProps = state => ({
    questionIndex: state.scratchGui.workbook.questionIndex,
    isAnswering: state.scratchGui.workbook.answering,
    description: state.scratchGui.workbook.question.explanation,
    toolboxBlocksVisibilities: state.scratchGui.workbook.question.toolboxBlocks ?? {},
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
