import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';
import Lightbox from 'react-images';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import arrowIcon from './arrow.svg';
import zoomIcon from '../stage-header/icon--fullscreen.svg';

const Cards = props => {
    const {
        visible,
        content,
        activeDeckIndex,
        step,
        onActivateDeckFactory,
        onCloseCards,
        onExitDeck,
        onToggleLightbox,
        onNextStep,
        onPrevStep,
        lightboxVisible,
        x,
        y,
        onDrag
    } = props;

    let inner;
    if (activeDeckIndex === null) return;
    const steps = content[activeDeckIndex].steps;

    const hasPrev = step > 0;
    const hasNext = step <= steps.length;

    if (step !== steps.length) {
        const {
            title,
            description,
            image,
            zoomedImage
        } = steps[step];

        // const exitDeck = () => onActivateDeck(null);

        inner = (
            <div className={styles.card}>
                <div className={styles.headerButtons}>
                    <div className={styles.collapseButton}><span onClick={onExitDeck}>⤴</span></div>
                    <div className={styles.stepTitle}>
                        {title}
                    </div>
                    <div className={styles.removeButton}><span onClick={onCloseCards}>×</span></div>
                </div>
                {description ? (
                    <div className={styles.stepDescription}>
                        {description}
                    </div>
                ) : null}
                <div
                    className={styles.stepImage}
                    onClick={onToggleLightbox}
                >
                    <img
                        draggable={false}
                        src={image}
                    />
                    <img className={styles.zoomIcon} src={zoomIcon} />
                    <Lightbox
                        backdropClosesModal={true}
                        images={[
                            { src: zoomedImage || image }
                        ]}
                        isOpen={lightboxVisible}
                        onClose={onToggleLightbox}
                        onClickImage={onToggleLightbox}
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
                    <div className={styles.collapseButton}><span onClick={onExitDeck}>⤴</span></div>
                    <div className={styles.stepTitle}>
                        How Tos
                    </div>
                    <div className={styles.removeButton}><span onClick={onCloseCards}>×</span></div>
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
                <div className={styles.seeAll}>
                    <div className={styles.seeAllButton} onClick={onExitDeck}>See all</div>
                </div>
                <div className={styles.leftButton}>
                    <img
                        draggable={false}
                        src={arrowIcon}
                        onClick={onPrevStep}
                    />
                </div>
            </div>
        );
    }
    return (
        <Draggable
            bounds="parent"
            position={{x, y}}
            onDrag={onDrag}
        >
            <div className={styles.cardContainer}>
                {inner}
            </div>
        </Draggable>
    );
};

Cards.propTypes = {
    visible: PropTypes.bool.isRequired,
    content: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        steps: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired // TODO normalize img/image names
        }))
    })),
    lightboxVisible: PropTypes.bool.isRequired,
    activeDeckIndex: PropTypes.number, // TODO Can be null
    step: PropTypes.number.isRequired,
    onActivateDeck: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onToggleLightbox: PropTypes.func.isRequired
};

export default Cards;
