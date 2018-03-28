import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';

import dragSay from './intro/drag-say.gif';
import addGlide from './intro/add-glide.gif';
import hatStack from './intro/hat-stack.gif';
import whenClicked from './intro/when-clicked.gif';

import addSay from './intro/add-say.gif';
import dragGlide from './intro/drag-glide.gif';

import clickSay from './story/click-say.gif';
import greenFlag from './story/green-flag.gif';
import addSprite from './story/add-sprite.gif';
import anotherSay from './story/another-say.gif';
import bothSay from './story/both-say.gif';
import addWait from './story/add-wait.gif';

import step_dragTurn from './zoom/drag-turn.gif';
import step_clickTurn from './zoom/click-turn.gif';
import step_forever from './zoom/forever.gif';
import step_move from './zoom/move.gif';
import step_color from './zoom/color.gif';
import step_loudness from './zoom/loudness.gif';
import step_edge from './zoom/edge.gif';
import step_greenflag from './zoom/green-flag.gif';
import step_stop from './zoom/stop.gif';
import step_zoom from './zoom/zoom.gif';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import arrowIcon from './arrow.svg';

import deck1 from './intro/when-clicked.gif';
import deck2 from './story/both-say.gif';
import deck3 from './zoom/zoom.gif';

class Card extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'setRef',
            'nextStep',
            'prevStep',
            'onLooksClick',
            'onEventsClick',
            'onSoundsClick',
            'onControlClick',
            'onMotionClick',
            'onChangeDeck',
            'onHome'
        ]);
        this.state = {
            step: 0,
            deck:  null,
            decks: {
                /*
                'Getting started' : {
                    name: 'Getting started',
                    img: deck1,
                    steps: [
                        {
                            title: "Move randomly",
                            description: (
                                <span>Drag out and click the <span className={styles.motionBlock} onClick={this.onMotionClick}>glide to random position</span> block</span>
                            ),
                            image: dragGlide,
                        },
                        {
                            title: "Say something",
                            description: (
                                <span>Add a <span className={styles.looksBlock} onClick={this.onLooksClick}>say</span> block</span>
                            ),
                            image: addSay,
                        },
                        {
                            title: "Start when you click the sprite",
                            description: (
                                <span>Add the <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                            ),
                            image: hatStack,
                        },
                        {
                            title: "Click the sprite to try it",
                            description: (''
                            ),
                            image: whenClicked,
                        },

                    ]
                },
                */
                /*
                'Getting started' : {
                    name: 'Getting started',
                    img: deck1,
                    steps: [
                        {
                            title: "Say something",
                            description: (
                                <span>Drag out and click the <span className={styles.looksBlock} onClick={this.onLooksClick}>say</span> block</span>
                            ),
                            image: dragSay,
                        },
                        {
                            title: "Move randomly",
                            description: (
                                <span>Add the <span className={styles.motionBlock} onClick={this.onMotionClick}>glide to random position</span> block</span>
                            ),
                            image: addGlide,
                        },
                        {
                            title: "Start when you click the sprite",
                            description: (
                                <span>Add the <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                            ),
                            image: hatStack,
                        },
                        {
                            title: "Click the sprite to try it",
                            description: (''
                            ),
                            image: whenClicked,
                        },

                    ]
                },
                */

                /*
                'Clicker game' : {
                    name: 'Clicker game',
                    img: deck2,
                    steps: [
                        {
                            title: "Move randomly",
                            description: (
                                <span>Try the <span className={styles.motionBlock} onClick={this.onMotionClick}>go to random position</span> block</span>
                            ),
                            image: addWait,
                        }, {
                            title: "Move when clicked",
                            description: (
                                <span>Add a <span className={styles.eventsBlock} onClick={this.onEventsClick}>when this sprite clicked</span> block</span>
                            ),
                            image: addWait,
                        }, {
                            title: "Add a sound",
                            description: (
                                <span>Add a <span className={styles.soundBlock} onClick={this.onSoundsClick}>play sound</span> block</span>
                            ),
                            image: addWait,
                        }
                    ]
                },
                */

                'Zoom around' : {
                    name: 'Zoom around',
                    img: deck3,
                    steps: [
                        {
                            title: "Add a turn block",
                            image: step_dragTurn,
                        }, {
                            title: "Click the block to run it",
                            image: step_clickTurn,
                        }, {
                            title: "Use a forever block to keep it going",
                            image: step_forever ,
                        }, {
                            title: "Add a move block",
                            image: step_move,
                         }, {
                            title: "Experiment with color effect block",
                            image: step_color,
                        }, {
                            title: "🗣 Use the loudness block and make some noise!",
                            image: step_loudness,
                        }, {
                            title: "Bounce when you reach the edge",
                            image: step_edge,
                        }, {
                            title: "Add a green flag block to the top",
                            image: step_greenflag,
                        }, {
                            title: "Try the green flag and stop buttons",
                            image: step_stop,
                        }, {
                            title: "Tinker!",
                            image: step_zoom,
                        }
                        ]
                },
                'Tell a story' : {
                    name: 'Tell a story',
                    img: deck2,
                    steps: [
                        {
                            title: "Add a say block",
                            image: clickSay,
                        }, {
                            title: "Use the green flag block to start",
                            image: greenFlag,
                        }, {
                            title: "Add another character",
                            image: addSprite,
                        }, {
                            title: "What will they say?",
                            image: anotherSay,
                         }, {
                            title: "Start the conversation",
                            image: bothSay,
                        }, {
                            title: "Use a wait block to take turns",
                            image: addWait,
                        }
                        ]
                },
            }
        };
    }
    componentDidMount () {
    }
    componentWillUnmount () {
    }
    componentWillUpdate (newProps, newState) {
    }
    handleClick (e) {
    }
    setRef () {

    }
    onLooksClick () {
        this.props.vm.runtime.emit('CATEGORY', 'Looks');
    }
    onSoundsClick () {
        this.props.vm.runtime.emit('CATEGORY', 'Sound');
    }
    onEventsClick () {
        this.props.vm.runtime.emit('CATEGORY', 'Events');
    }
    onControlClick () {
        this.props.vm.runtime.emit('CATEGORY', 'Control');
    }
    onMotionClick () {
        this.props.vm.runtime.emit('CATEGORY', 'Motion');
    }
    nextStep () {
        if (this.state.deck) {
            const steps = this.state.decks[this.state.deck].steps;
            if (this.state.step === steps.length - 1) {
                this.setState({step: 0, deck: null})
            } else {
                this.setState({
                    step: this.state.step + 1
                })
            }
        }
    }
    prevStep () {
        if (this.state.deck) {
            const steps = this.state.decks[this.state.deck].steps;
            if (this.state.step === 0) {
                this.setState({step: 0, deck: null})
            } else {
                this.setState({
                    step: this.state.step - 1
                })
            }
        }
    }
    onChangeDeck (name) {
        this.setState({
            deck: name,
            step: 0
        })
    }
    onHome () {
        this.setState({
            deck: null, step: 0
        });
    }
    render () {
        let inner;
        if (this.state.deck) {
            const steps = this.state.decks[this.state.deck].steps;

            const hasPrev = this.state.step > 0;
            const hasNext = this.state.step < steps.length;


            const {
                title,
                description,
                image
            } = steps[this.state.step];
            inner = (
                <div className={styles.card}>
                    <div className={styles.headerButtons}>
                        <div className={styles.collapseButton}><span onClick={this.onHome}>⤴</span></div>
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>✖️</span></div>
                    </div>
                    <div className={styles.stepTitle}>
                        {title}
                    </div>
                    {description ? (
                        <div className={styles.stepDescription}>
                            {description}
                        </div>
                    ) : null}
                    <div className={styles.stepImage}>
                        <img draggable={false} src={image} />
                    </div>
                    {hasNext ? (
                        <div className={styles.rightButton}>
                            <img draggable={false} src={arrowIcon} onClick={this.nextStep} />
                        </div>
                    ) : null}
                    {hasPrev ? (
                        <div className={styles.leftButton}>
                            <img draggable={false} src={arrowIcon} onClick={this.prevStep} />
                        </div>
                    ) : null}
                </div>
            );
        } else {
            inner = (
                <div className={styles.card}>
                    <div className={styles.headerButtons}>
                        <div className={styles.collapseButton}></div>
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>✖️</span></div>
                    </div>
                    <div className={styles.stepTitle}>
                        How Tos
                    </div>
                    <div className={styles.stepDescription}>
                        <div className={styles.decks}>
                            {Object.values(this.state.decks).map(d => (
                                <div className={styles.deck} onClick={() => this.onChangeDeck(d.name)}>
                                    <img className={styles.deckImage} src={d.img} />
                                    <div className={styles.deckName}>{d.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <Draggable
                bounds="parent"
                defaultPosition={{x: 336,y: 436}}
            >
                <div className={styles.cardContainer}>
                    {/* {hasPrev ? (
                        <div className={styles.leftCard} onClick={this.prevStep}></div>
                    ) : null}
                    {hasNext ? (
                        <div className={styles.rightCard} onClick={this.nextStep}></div>
                    ) : null} */}
                    {inner}
                </div>
            </Draggable>
        );
    }
}

Card.propTypes = {
    // vm: PropTypes.instanceOf(VM)
};


const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseTipsLibrary: () => dispatch(closeTipsLibrary())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);
