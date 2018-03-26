import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';

import step1 from './change-color-effect.gif';
import step2 from './play-sound.gif';
import step3 from './add-hat.gif';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import arrowIcon from './arrow.svg';

import deck1 from '../../lib/libraries/tips/animate-a-name.png';
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
            'onChangeDeck'
        ]);
        this.state = {
            step: 0,
            deck:  null,
            decks: {
                'Changing color' : {
                    name: 'Changing color',
                    img: deck1,
                    steps: [
                        {
                            title: "Changing color",
                            description: (
                                <span>Try the <span className={styles.colorBlock} onClick={this.onLooksClick}>change color effect</span> block</span>
                            ),
                            image: step1,
                        }, {
                            title: "Changing color",
                            description: (
                                <span>Add a <span className={styles.soundBlock} onClick={this.onSoundsClick}>play sound</span> block and try the blocks</span>
                            ),
                            image: step2,
                        }, {
                            title: "Changing color",
                            description: (
                                <span>Add a <span className={styles.whenBlock} onClick={this.onEventsClick}>when key pressed</span> block and press space</span>
                            ),
                            image: step3,
                        }
                    ]
                },
                'Changing shape' : {
                    name: 'Changing shape',
                    img: deck2,
                    steps: [
                        {
                            title: "Changing shape",
                            description: (
                                <span>Try the <span className={styles.colorBlock} onClick={this.onLooksClick}>change color effect</span> block</span>
                            ),
                            image: step1,
                        }, {
                            title: "Changing shape",
                            description: (
                                <span>Add a <span className={styles.soundBlock} onClick={this.onSoundsClick}>play sound</span> block and try the blocks</span>
                            ),
                            image: step2,
                        }, {
                            title: "Changing shape",
                            description: (
                                <span>Add a <span className={styles.whenBlock} onClick={this.onEventsClick}>when key pressed</span> block and press space</span>
                            ),
                            image: step3,
                        }
                    ]
                },
                'Changing size' : {
                    name: 'Changing size',
                    img: deck3,
                    steps: [
                        {
                            title: "Changing size",
                            description: (
                                <span>Try the <span className={styles.colorBlock} onClick={this.onLooksClick}>change color effect</span> block</span>
                            ),
                            image: step1,
                        }, {
                            title: "Changing size",
                            description: (
                                <span>Add a <span className={styles.soundBlock} onClick={this.onSoundsClick}>play sound</span> block and try the blocks</span>
                            ),
                            image: step2,
                        }, {
                            title: "Changing size",
                            description: (
                                <span>Add a <span className={styles.whenBlock} onClick={this.onEventsClick}>when key pressed</span> block and press space</span>
                            ),
                            image: step3,
                        }
                    ]
                }
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
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>Remove</span></div>
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
                        <div className={styles.removeButton}><span onClick={this.props.onCloseTipsLibrary}>Remove</span></div>
                    </div>
                    <div className={styles.stepTitle}>
                        More things to try
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
            <Draggable defaultPosition={{x: 370,y: 20}}>
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
