import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import styles from './card.css';
import Draggable from 'react-draggable';

import {connect} from 'react-redux';
import {closeTipsLibrary} from '../../reducers/modals';

import nextIcon from './icon--next.svg';
import prevIcon from './icon--prev.svg';

import zoomIcon from '../stage-header/icon--fullscreen.svg';

import helpIcon from './icon--help.svg';
import closeIcon from '../close-button/icon--close.svg';

const NextPrevButtons = ({onNextStep, onPrevStep}) => (
    <Fragment>
        {onNextStep ? (
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
        {onPrevStep ? (
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
    </Fragment>
);

const VideoStep = ({video, dragging}) => (
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
            allowFullScreen
        />
    </div>
);

const ImageStep = ({title, image}) => (
    <Fragment>
        <div className={styles.stepTitle}>
            {title}
        </div>
        <div className={styles.stepImageContainer}>
            <img
                draggable={false}
                src={image}
                className={styles.stepImage}
            />
        </div>
    </Fragment>
);

const CardHeader = ({onCloseCards, onExitDeck, steps, step}) => (
    <div className={styles.headerButtons}>
        <div className={styles.collapseButton} onClick={onExitDeck}>
            <img className={styles.helpIcon} src={helpIcon}/>
            <FormattedMessage
                defaultMessage="All How-Tos"
                description="Title for button to return to how-to library"
                id="gui.cards.all-how-tos"
            />
        </div>
            {steps.length > 1 ? (
                <div className={styles.stepsList}>
                    {Array(steps.length).fill(0).map((_, i) => (
                        <div
                            key={`pip-step-${i}`}
                            className={i === step ? styles.activeStepPip : styles.inactiveStepPip}
                        />
                    ))}
                </div>
            ) : null}
        <div className={styles.removeButton} onClick={onCloseCards}>
            <FormattedMessage
                defaultMessage="Remove"
                description="Title for button to close how-to card"
                id="gui.cards.remove"
            />
            <img className={styles.closeIcon} src={closeIcon}/>
        </div>
    </div>
);

const PreviewsStep = ({deckIds, content, onActivateDeckFactory, onExitDeck}) => (
    <Fragment>
        <div className={styles.stepTitle}>
            <FormattedMessage
                defaultMessage="More things to try!"
                description="Title card with more things to try"
                id="gui.cards.more-things-to-try"
            />
        </div>
        <div className={styles.stepDescription}>
            <div className={styles.decks}>
                {deckIds.map(id => (
                    <div
                        className={styles.deck}
                        key={`deck-preview-${id}`}
                        onClick={onActivateDeckFactory(id)}
                    >
                        <img
                            className={styles.deckImage}
                            src={content[id].img}
                            draggable={false}
                        />
                        <div className={styles.deckName}>{content[id].name}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.seeAll}>
            <div className={styles.seeAllButton} onClick={onExitDeck}>
                <FormattedMessage
                    defaultMessage="See more"
                    description="Title for button to see more in how-to library"
                    id="gui.cards.see-more"
                />
            </div>
        </div>
    </Fragment>
);

const Cards = props => {
    const {
        dragging,
        content,
        activeDeckId,
        step,
        onActivateDeckFactory,
        onNextStep,
        onPrevStep,
        onExitDeck,
        onCloseCards,
        x,
        y,
        onDrag,
        onStartDrag,
        onEndDrag
    } = props;

    let inner;

    if (activeDeckId === null) return;

    const steps = content[activeDeckId].steps;

    const hasPrev = step > 0;
    const hasNext = step < steps.length - 1;

    return (
        <Draggable
            bounds="parent"
            position={{x, y}}
            onDrag={onDrag}
            onStart={onStartDrag}
            onStop={onEndDrag}
        >
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <CardHeader {...{onExitDeck, onCloseCards, steps, step}} />
                    <div className={styles.stepBody}>
                        {steps[step].deckIds ? (
                            <PreviewsStep
                                content={content}
                                deckIds={steps[step].deckIds}
                                onActivateDeckFactory={onActivateDeckFactory}
                                onExitDeck={onExitDeck}
                            />
                        ) : (
                            steps[step].video ? (
                                <VideoStep
                                    dragging={dragging}
                                    video={steps[step].video}
                                 />
                            ) : (
                                <ImageStep
                                    title={steps[step].title}
                                    image={steps[step].image}
                                />
                            )
                        )}
                    </div>
                    <NextPrevButtons
                        onNextStep={hasNext ? onNextStep : null}
                        onPrevStep={hasPrev ? onPrevStep : null}
                    />
                </div>
            </div>
        </Draggable>
    );
};

Cards.propTypes = {
    visible: PropTypes.bool.isRequired,
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
    activeDeckId: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    onActivateDeckFactory: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired
};

export default Cards;
