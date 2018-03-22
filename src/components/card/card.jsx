import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';

import step1 from './change-color-effect.gif';
import step2 from './play-sound.gif';
import step3 from './add-hat.gif';

import arrowIcon from './arrow.svg';

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
            'onSoundsClick'
        ]);
        this.state = {
            step: 0,
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
                },
            ]
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
        this.setState({
            step: this.state.step + 1
        })
    }
    prevStep () {
        this.setState({
            step: this.state.step - 1
        })
    }
    render () {

        const hasPrev = this.state.step > 0;
        const hasNext = this.state.step < this.state.steps.length - 1;

        const {
            title,
            description,
            image
        } = this.state.steps[this.state.step];

        return (
            <Draggable defaultPosition={{x: 370,y: 20}}>
                <div className={styles.cardContainer}>
                    {/* {hasPrev ? (
                        <div className={styles.leftCard} onClick={this.prevStep}></div>
                    ) : null}
                    {hasNext ? (
                        <div className={styles.rightCard} onClick={this.nextStep}></div>
                    ) : null} */}
                    <div className={styles.card}>
                        <div className={styles.headerButtons}>
                            <div className={styles.removeButton}>Remove</div>
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
                </div>
            </Draggable>
        );
    }
}

Card.propTypes = {
    // vm: PropTypes.instanceOf(VM)
};

export default Card;
