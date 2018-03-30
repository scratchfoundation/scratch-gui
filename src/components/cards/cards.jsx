import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import arrowIcon from './arrow.svg';

const Card = props => {
    const {
        visible,
        content,
        activeDeckIndex,
        step,
        onActivateDeckFactory,
        onCloseCards,
        onNextStep,
        onPrevStep,
        onExitDeck
    } = props;

    let inner;
    if (activeDeckIndex !== null) {
        const steps = content[activeDeckIndex].steps;

        const hasPrev = step > 0;
        const hasNext = step < steps.length;

        const {
            title,
            description,
            image
        } = steps[step];

        // const exitDeck = () => onActivateDeck(null);

        inner = (
            <div className={styles.card}>
                <div className={styles.headerButtons}>
                    <div className={styles.collapseButton}><span onClick={onExitDeck}>⤴</span></div>
                    <div className={styles.removeButton}><span onClick={onCloseCards}>✖️</span></div>
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
                    <img
                        draggable={false}
                        src={image}
                    />
                </div>
                {hasNext ? (
                    <div className={styles.rightButton}>
                        <img
                            draggable={false}
                            src={arrowIcon}
                            onClick={onNextStep}
                        />
                    </div>
                ) : null}
                {hasPrev ? (
                    <div className={styles.leftButton}>
                        <img
                            draggable={false}
                            src={arrowIcon}
                            onClick={onPrevStep}
                        />
                    </div>
                ) : null}
            </div>
        );
    } else {
        inner = (
            <div className={styles.card}>
                <div className={styles.headerButtons}>
                    <div className={styles.collapseButton} />
                    <div className={styles.removeButton}><span onClick={onCloseCards}>✖️</span></div>
                </div>
                <div className={styles.stepTitle}>
                    How Tos
                </div>
                <div className={styles.stepDescription}>
                    <div className={styles.decks}>
                        {Object.values(content).map((deck, i) => (
                            <div
                                className={styles.deck}
                                onClick={onActivateDeckFactory(i)}
                            >
                                <img
                                    className={styles.deckImage}
                                    src={deck.img}
                                />
                                <div className={styles.deckName}>{deck.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Draggable
            bounds="parent"
            defaultPosition={{x: 336, y: 436}}
        >
            <div className={styles.cardContainer}>
                {inner}
            </div>
        </Draggable>
    );
};

Card.propTypes = {
    visible: PropTypes.bool.isRequired,
    content: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        steps: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired // TODO normalize img/image names
        }))
    })),
    activeDeckIndex: PropTypes.number, // TODO Can be null
    step: PropTypes.number.isRequired,
    onActivateDeck: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired
};

export default Card;
