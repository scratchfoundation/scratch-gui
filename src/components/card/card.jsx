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

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import arrowIcon from './arrow.svg';

import deck1 from './intro/when-clicked.gif';
import deck2 from '../../lib/libraries/tips/make-it-fly.png';
import deck3 from '../../lib/libraries/tips/make-music.png';

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
            deck:  'Getting started',
            decks: {
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
                'Tell a story' : {
                    name: 'Tell a story',
                    img: deck1,
                    steps: [
                        {
                            title: "Say something",
                            description: (
                                <span>Try the <span className={styles.colorBlock} onClick={this.onLooksClick}>say</span> block.</span>
                            ),
                            image: clickSay,
                        }, {
                            title: "Start the story",
                            description: (
                                <span>Add a <span className={styles.eventsBlock} onClick={this.onEventsClick}>green flag</span> block and try it out.</span>
                            ),
                            image: greenFlag,
                        }, {
                            title: "Add another character",
                            description: (
                                <span>Click the add sprite button.</span>
                            ),
                            image: addSprite,
                        }, {
                            title: "Say something else",
                            description: (
                                <span>What will your new character <span className={styles.colorBlock} onClick={this.onLooksClick}>say</span>?</span>
                            ),
                            image: anotherSay,
                         }, {
                            title: "Make both talk",
                            description: (
                                <span>Click the green flag to make them both talk.</span>
                            ),
                            image: bothSay,
                        }, {
                            title: "Take turns",
                            description: (
                                <span>Insert a <span className={styles.controlBlock} onClick={this.onControlClick}>wait</span> block.</span>
                            ),
                            image: addWait,
                        }
                        ]
                },
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
                'Zoom around' : {
                    name: 'Zoom around',
                    img: deck3,
                    steps: [
                        {
                            title: "Move and turn",
                            description: (
                                <span>Try the <span className={styles.motionBlock} onClick={this.onMotionClick}>move and turn</span> blocks</span>
                            ),
                            image: addWait,
                        }
                    ]
                }
                */
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
                        <div className={styles.collapseButton}><span onClick={this.onCollapse}>↕️ Collapse</span></div>
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>✖️</span></div>
                    </div>
                    <div className={styles.stepTitle}>
                        {title}
                    </div>
                    <div className={styles.stepDescription}>
                        {description}
                    </div>
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
                        <div className={styles.collapseButton}><span onClick={this.onHome}>⬆️</span></div>
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>✖️</span></div>
                    </div>
                    <div className={styles.stepTitle}>
                        Tips
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
                defaultPosition={{x: 336,y: 366}}
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
