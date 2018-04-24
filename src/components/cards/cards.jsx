import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './card.css';
import Draggable from 'react-draggable';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import nextIcon from './icon--next.svg';
import prevIcon from './icon--prev.svg';

import zoomIcon from '../stage-header/icon--fullscreen.svg';

import helpIcon from './icon--help.svg';
import closeIcon from '../close-button/icon--close.svg';

const Cards = props => {
    const {
        visible,
        content,
        activeDeckIndex,
        step,
        onActivateDeckFactory,
        onCloseCards,
        onExitDeck,
        onNextStep,
        onPrevStep,
        x,
        y,
        onDrag,
        onStartDrag,
        onEndDrag,
        dragging
    } = props;

    let inner;
    if (activeDeckIndex === null) {
        inner = (
            <div className={styles.card}>
                <div className={styles.stepBody}>
                    <div className={styles.stepTitle}>
                        Get started with Scratch!
                    </div>
                    <div className={styles.decks}>
                        {Object.values(content.slice(0,3)).map((deck, i) => (
                            <div
                                className={styles.deck}
                                onClick={onActivateDeckFactory(i)}
                            >
                                <img
                                    className={styles.deckImage}
                                    src={deck.img}
                                    draggable={false}
                                />
                                <div className={styles.deckName}>{deck.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        const steps = content[activeDeckIndex].steps;

        const hasPrev = step > 0;
        const hasNext = step <= steps.length;
        if (step !== steps.length) {
            const {
                title,
                description,
                image,
                zoomedImage,
                video
            } = steps[step];

            // const exitDeck = () => onActivateDeck(null);

            inner = (
                <div className={styles.card}>
                    <div className={styles.headerButtons}>
                        <div className={styles.collapseButton} onClick={onExitDeck}>
                            <img className={styles.helpIcon} src={helpIcon}/>
                            All How-Tos
                        </div>
                        {video ? null : (
                            <div className={styles.stepsList}>
                                {steps.map((s, i) => (
                                    i === step ? (
                                        <div className={styles.activeStepPip}></div>
                                    ) : (
                                        <div className={styles.inactiveStepPip}></div>
                                    )
                                ))}
                            </div>
                        )}
                        <div className={styles.removeButton} onClick={onCloseCards}>
                            Remove
                            <img className={styles.closeIcon} src={closeIcon}/>
                        </div>
                    </div>
                    {description ? (
                        <div className={styles.stepDescription}>
                            {description}
                        </div>
                    ) : null}
                    <div
                        className={styles.stepBody}
                    >
                        {video ? null : (
                            <div className={styles.stepTitle}>
                                {title}
                            </div>
                        )}
                        {video ? (
                            <div className={styles.stepVideo}>
                                {dragging ? (
                                    <div className={styles.videoCover} />
                                ) : null}
                                <iframe
                                    width="600"
                                    height="337"
                                    src={`${video}?rel=0&amp;showinfo=0`}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen>
                                    Video not available.
                                </iframe>
                            </div>
                        ) : (
                            <div className={styles.stepImageContainer}>
                                <img
                                    draggable={false}
                                    src={image}
                                    className={styles.stepImage}
                                />
                            </div>
                        )}
                    </div>
                    {hasNext ? (
                        <div>
                            <div className={styles.rightCard} />
                            <div className={styles.rightButton} onClick={onNextStep}>
                                <img
                                    draggable={false}
                                    src={nextIcon}
                                />
                            </div>
                        </div>
                    ) : null}
                    {hasPrev ? (
                        <div>
                            <div className={styles.leftCard} />

                            <div className={styles.leftButton} onClick={onPrevStep}>
                                <img
                                    draggable={false}
                                    src={prevIcon}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            );
        } else {
            inner = (
                <div className={styles.card}>
                    <div className={styles.headerButtons}>
                        <div className={styles.collapseButton} onClick={onExitDeck}>
                            <img className={styles.helpIcon} src={helpIcon}/>
                            All How-Tos
                        </div>
                        <div className={styles.removeButton} onClick={onCloseCards}>
                            Remove
                            <img className={styles.closeIcon} src={closeIcon}/>
                        </div>
                    </div>
                    <div
                        className={styles.stepBody}
                    >
                        <div className={styles.stepTitle}>
                            More things to try!
                        </div>
                        <div className={styles.stepDescription}>
                            <div className={styles.decks}>
                                {Object.values(content.slice(0,3)).map((deck, i) => (
                                    <div
                                        className={styles.deck}
                                        onClick={onActivateDeckFactory(i)}
                                    >
                                        <img
                                            className={styles.deckImage}
                                            src={deck.img}
                                            draggable={false}
                                        />
                                        <div className={styles.deckName}>{deck.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.seeAll}>
                            <div className={styles.seeAllButton} onClick={onExitDeck}>
                                See more
                                {/* <img draggable={false} src={nextIcon} /> */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.leftCard} />

                        <div className={styles.leftButton} onClick={onPrevStep}>
                            <img
                                draggable={false}
                                src={prevIcon}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
    if (activeDeckIndex === null) {
        return (
            <div className={styles.backdrop}>
                <Draggable
                    bounds="parent"
                    position={{x, y}}
                    onDrag={onDrag}
                >
                    <div className={styles.cardContainer}>
                        {inner}
                    </div>
                </Draggable>
            </div>
        );
    }
    return (
        <Draggable
            bounds="parent"
            position={{x, y}}
            onDrag={onDrag}
            onStart={onStartDrag}
            onStop={onEndDrag}
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
    activeDeckIndex: PropTypes.number, // TODO Can be null
    step: PropTypes.number.isRequired,
    onActivateDeck: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired
};

export default Cards;
