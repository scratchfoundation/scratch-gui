import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import Draggable from 'react-draggable';

import styles from './card.css';

import rightArrow from './icon--next.svg';
import leftArrow from './icon--prev.svg';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from '../close-button/icon--close.svg';

const CardHeader = ({onCloseCards, onShowAll, totalSteps, step}) => (
    <div className={styles.headerButtons}>
        <div
            className={styles.allButton}
            onClick={onShowAll}
        >
            <img
                className={styles.helpIcon}
                src={helpIcon}
            />
            <FormattedMessage
                defaultMessage="Tutorials"
                description="Title for button to return to tutorials library"
                id="gui.cards.all-tutorials"
            />
        </div>
        {totalSteps > 1 ? (
            <div className={styles.stepsList}>
                {Array(totalSteps).fill(0)
                    .map((_, i) => (
                        <div
                            className={i === step ? styles.activeStepPip : styles.inactiveStepPip}
                            key={`pip-step-${i}`}
                        />
                    ))}
            </div>
        ) : null}
        <div
            className={styles.removeButton}
            onClick={onCloseCards}
        >
            <FormattedMessage
                defaultMessage="Close"
                description="Title for button to close how-to card"
                id="gui.cards.remove"
            />
            <img
                className={styles.closeIcon}
                src={closeIcon}
            />
        </div>
    </div>
);

// Video step needs to know if the card is being dragged to cover the video
// so that the mouseup is not swallowed by the iframe.
const VideoStep = ({video, dragging}) => (
    <div className={styles.stepVideo}>
        {dragging ? (
            <div className={styles.videoCover} />
        ) : null}
        <iframe
            allowFullScreen
            allow="autoplay; encrypted-media"
            frameBorder="0"
            height="337"
            src={`${video}?rel=0&amp;showinfo=0`}
            width="600"
        />
    </div>
);

VideoStep.propTypes = {
    dragging: PropTypes.bool.isRequired,
    video: PropTypes.string.isRequired
};

const ImageStep = ({title, image}) => (
    <Fragment>
        <div className={styles.stepTitle}>
            {title}
        </div>
        <div className={styles.stepImageContainer}>
            <img
                className={styles.stepImage}
                draggable={false}
                src={image}
            />
        </div>
    </Fragment>
);

ImageStep.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired
};

const NextPrevButtons = ({isRtl, onNextStep, onPrevStep}) => (
    <Fragment>
        {onNextStep ? (
            <div>
                <div className={isRtl ? styles.leftCard : styles.rightCard} />
                <div
                    className={isRtl ? styles.leftButton : styles.rightButton}
                    onClick={onNextStep}
                >
                    <img
                        draggable={false}
                        src={isRtl ? leftArrow : rightArrow}
                    />
                </div>
            </div>
        ) : null}
        {onPrevStep ? (
            <div>
                <div className={isRtl ? styles.rightCard : styles.leftCard} />
                <div
                    className={isRtl ? styles.rightButton : styles.leftButton}
                    onClick={onPrevStep}
                >
                    <img
                        draggable={false}
                        src={isRtl ? rightArrow : leftArrow}
                    />
                </div>
            </div>
        ) : null}
    </Fragment>
);

NextPrevButtons.propTypes = {
    isRtl: PropTypes.bool,
    onNextStep: PropTypes.func,
    onPrevStep: PropTypes.func
};
CardHeader.propTypes = {
    onCloseCards: PropTypes.func.isRequired,
    onShowAll: PropTypes.func.isRequired,
    step: PropTypes.number,
    totalSteps: PropTypes.number
};

const PreviewsStep = ({deckIds, content, onActivateDeckFactory, onShowAll}) => (
    <Fragment>
        <div className={styles.stepTitle}>
            <FormattedMessage
                defaultMessage="More things to try!"
                description="Title card with more things to try"
                id="gui.cards.more-things-to-try"
            />
        </div>
        <div className={styles.decks}>
            {deckIds.slice(0, 2).map(id => (
                <div
                    className={styles.deck}
                    key={`deck-preview-${id}`}
                    onClick={onActivateDeckFactory(id)}
                >
                    <img
                        className={styles.deckImage}
                        draggable={false}
                        src={content[id].img}
                    />
                    <div className={styles.deckName}>{content[id].name}</div>
                </div>
            ))}
        </div>
        <div className={styles.seeAll}>
            <div
                className={styles.seeAllButton}
                onClick={onShowAll}
            >
                <FormattedMessage
                    defaultMessage="See more"
                    description="Title for button to see more in how-to library"
                    id="gui.cards.see-more"
                />
            </div>
        </div>
    </Fragment>
);

PreviewsStep.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.shape({
            name: PropTypes.node.isRequired,
            img: PropTypes.string.isRequired,
            steps: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.node,
                image: PropTypes.string,
                video: PropTypes.string,
                deckIds: PropTypes.arrayOf(PropTypes.string)
            }))
        })
    }).isRequired,
    deckIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onActivateDeckFactory: PropTypes.func.isRequired,
    onShowAll: PropTypes.func.isRequired
};

const Cards = props => {
    const {
        activeDeckId,
        content,
        dragging,
        isRtl,
        onActivateDeckFactory,
        onCloseCards,
        onDrag,
        onStartDrag,
        onEndDrag,
        onShowAll,
        onNextStep,
        onPrevStep,
        step,
        ...posProps
    } = props;
    let {x, y} = posProps;

    if (activeDeckId === null) return;

    if (x === 0 && y === 0) {
        // initialize positions
        x = isRtl ? -292 : 292;
        y = 365;
    }

    const steps = content[activeDeckId].steps;

    return (
        <Draggable
            bounds="parent"
            position={{x: x, y: y}}
            onDrag={onDrag}
            onStart={onStartDrag}
            onStop={onEndDrag}
        >
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <CardHeader
                        step={step}
                        totalSteps={steps.length}
                        onCloseCards={onCloseCards}
                        onShowAll={onShowAll}
                    />
                    <div className={styles.stepBody}>
                        {steps[step].deckIds ? (
                            <PreviewsStep
                                content={content}
                                deckIds={steps[step].deckIds}
                                onActivateDeckFactory={onActivateDeckFactory}
                                onShowAll={onShowAll}
                            />
                        ) : (
                            steps[step].video ? (
                                <VideoStep
                                    dragging={dragging}
                                    video={steps[step].video}
                                />
                            ) : (
                                <ImageStep
                                    image={steps[step].image}
                                    title={steps[step].title}
                                />
                            )
                        )}
                    </div>
                    <NextPrevButtons
                        isRtl={isRtl}
                        onNextStep={step < steps.length - 1 ? onNextStep : null}
                        onPrevStep={step > 0 ? onPrevStep : null}
                    />
                </div>
            </div>
        </Draggable>
    );
};

Cards.propTypes = {
    activeDeckId: PropTypes.string.isRequired,
    content: PropTypes.shape({
        id: PropTypes.shape({
            name: PropTypes.node.isRequired,
            img: PropTypes.string.isRequired,
            steps: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.node,
                image: PropTypes.string,
                video: PropTypes.string,
                deckIds: PropTypes.arrayOf(PropTypes.string)
            }))
        })
    }),
    dragging: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool,
    onActivateDeckFactory: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onShowAll: PropTypes.func,
    onStartDrag: PropTypes.func,
    step: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};

export default Cards;
