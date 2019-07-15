import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import Draggable from 'react-draggable';

import styles from './card.css';

import shrinkIcon from './icon--shrink.svg';
import expandIcon from './icon--expand.svg';

import rightArrow from './icon--next.svg';
import leftArrow from './icon--prev.svg';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import closeIcon from './icon--close.svg';

import {translateVideo} from '../../lib/libraries/decks/translate-video.js';
import {translateImage} from '../../lib/libraries/decks/translate-image.js';

const CardHeader = ({onCloseCards, onShrinkExpandCards, onShowAll, totalSteps, step, expanded}) => (
    <div className={expanded ? styles.headerButtons : classNames(styles.headerButtons, styles.headerButtonsHidden)}>
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
        <div className={styles.headerButtonsRight}>
            <div
                className={styles.shrinkExpandButton}
                onClick={onShrinkExpandCards}
            >
                <img
                    draggable={false}
                    src={expanded ? shrinkIcon : expandIcon}
                />
                {expanded ?
                    <FormattedMessage
                        defaultMessage="Shrink"
                        description="Title for button to shrink how-to card"
                        id="gui.cards.shrink"
                    /> :
                    <FormattedMessage
                        defaultMessage="Expand"
                        description="Title for button to expand how-to card"
                        id="gui.cards.expand"
                    />
                }
            </div>
            <div
                className={styles.removeButton}
                onClick={onCloseCards}
            >
                <img
                    className={styles.closeIcon}
                    src={closeIcon}
                />
                <FormattedMessage
                    defaultMessage="Close"
                    description="Title for button to close how-to card"
                    id="gui.cards.close"
                />
            </div>
        </div>
    </div>
);

class VideoStep extends React.Component {

    componentDidMount () {
        const script = document.createElement('script');
        script.src = `https://fast.wistia.com/embed/medias/${this.props.video}.jsonp`;
        script.async = true;
        script.setAttribute('id', 'wistia-video-content');
        document.body.appendChild(script);

        const script2 = document.createElement('script');
        script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
        script2.async = true;
        script2.setAttribute('id', 'wistia-video-api');
        document.body.appendChild(script2);
    }

    // We use the Wistia API here to update or pause the video dynamically:
    // https://wistia.com/support/developers/player-api
    componentDidUpdate (prevProps) {
        // Ensure the wistia API is loaded and available
        if (!(window.Wistia && window.Wistia.api)) return;

        // Get a handle on the currently loaded video
        const video = window.Wistia.api(prevProps.video);

        // Reset the video source if a new video has been chosen from the library
        if (prevProps.video !== this.props.video) {
            video.replaceWith(this.props.video);
        }

        // Pause the video if the modal is being shrunken
        if (!this.props.expanded) {
            video.pause();
        }
    }

    componentWillUnmount () {
        const script = document.getElementById('wistia-video-content');
        script.parentNode.removeChild(script);

        const script2 = document.getElementById('wistia-video-api');
        script2.parentNode.removeChild(script2);
    }

    render () {
        return (
            <div className={styles.stepVideo}>
                <div
                    className={`wistia_embed wistia_async_${this.props.video}`}
                    id="video-div"
                    style={{height: `257px`, width: `466px`}}
                >
                    &nbsp;
                </div>
            </div>
        );
    }
}

VideoStep.propTypes = {
    expanded: PropTypes.bool.isRequired,
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
                key={image} /* Use src as key to prevent hanging around on slow connections */
                src={image}
            />
        </div>
    </Fragment>
);

ImageStep.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired
};

const NextPrevButtons = ({isRtl, onNextStep, onPrevStep, expanded}) => (
    <Fragment>
        {onNextStep ? (
            <div>
                <div className={expanded ? (isRtl ? styles.leftCard : styles.rightCard) : styles.hidden} />
                <div
                    className={expanded ? (isRtl ? styles.leftButton : styles.rightButton) : styles.hidden}
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
                <div className={expanded ? (isRtl ? styles.rightCard : styles.leftCard) : styles.hidden} />
                <div
                    className={expanded ? (isRtl ? styles.rightButton : styles.leftButton) : styles.hidden}
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
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool,
    onNextStep: PropTypes.func,
    onPrevStep: PropTypes.func
};
CardHeader.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onShowAll: PropTypes.func.isRequired,
    onShrinkExpandCards: PropTypes.func.isRequired,
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
        locale,
        onActivateDeckFactory,
        onCloseCards,
        onShrinkExpandCards,
        onDrag,
        onStartDrag,
        onEndDrag,
        onShowAll,
        onNextStep,
        onPrevStep,
        showVideos,
        step,
        expanded,
        ...posProps
    } = props;
    let {x, y} = posProps;

    if (activeDeckId === null) return;

    // Tutorial cards need to calculate their own dragging bounds
    // to allow for dragging the cards off the left, right and bottom
    // edges of the workspace.
    const cardHorizontalDragOffset = 400; // ~80% of card width
    const cardVerticalDragOffset = expanded ? 257 : 0; // ~80% of card height, if expanded
    const menuBarHeight = 48; // TODO: get pre-calculated from elsewhere?
    const wideCardWidth = 500;

    if (x === 0 && y === 0) {
        // initialize positions
        x = isRtl ? (-190 - wideCardWidth - cardHorizontalDragOffset) : 292;
        x += cardHorizontalDragOffset;
        // The tallest cards are about 320px high, and the default position is pinned
        // to near the bottom of the blocks palette to allow room to work above.
        const tallCardHeight = 320;
        const bottomMargin = 60; // To avoid overlapping the backpack region
        y = window.innerHeight - tallCardHeight - bottomMargin - menuBarHeight;
    }

    const steps = content[activeDeckId].steps;

    return (
        // Custom overlay to act as the bounding parent for the draggable, using values from above
        <div
            className={styles.cardContainerOverlay}
            style={{
                width: `${window.innerWidth + (2 * cardHorizontalDragOffset)}px`,
                height: `${window.innerHeight - menuBarHeight + cardVerticalDragOffset}px`,
                top: `${menuBarHeight}px`,
                left: `${-cardHorizontalDragOffset}px`
            }}
        >
            <Draggable
                bounds="parent"
                cancel="#video-div" // disable dragging on video div
                position={{x: x, y: y}}
                onDrag={onDrag}
                onStart={onStartDrag}
                onStop={onEndDrag}
            >
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <CardHeader
                            expanded={expanded}
                            step={step}
                            totalSteps={steps.length}
                            onCloseCards={onCloseCards}
                            onShowAll={onShowAll}
                            onShrinkExpandCards={onShrinkExpandCards}
                        />
                        <div className={expanded ? styles.stepBody : styles.hidden}>
                            {steps[step].deckIds ? (
                                <PreviewsStep
                                    content={content}
                                    deckIds={steps[step].deckIds}
                                    onActivateDeckFactory={onActivateDeckFactory}
                                    onShowAll={onShowAll}
                                />
                            ) : (
                                steps[step].video ? (
                                    showVideos ? (
                                        <VideoStep
                                            dragging={dragging}
                                            expanded={expanded}
                                            video={translateVideo(steps[step].video, locale)}
                                        />
                                    ) : ( // Else show the deck image and title
                                        <ImageStep
                                            image={content[activeDeckId].img}
                                            title={content[activeDeckId].name}
                                        />
                                    )
                                ) : (
                                    <ImageStep
                                        image={translateImage(steps[step].image, locale)}
                                        title={steps[step].title}
                                    />
                                )
                            )}
                            {steps[step].trackingPixel && steps[step].trackingPixel}
                        </div>
                        <NextPrevButtons
                            expanded={expanded}
                            isRtl={isRtl}
                            onNextStep={step < steps.length - 1 ? onNextStep : null}
                            onPrevStep={step > 0 ? onPrevStep : null}
                        />
                    </div>
                </div>
            </Draggable>
        </div>
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
    expanded: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    onActivateDeckFactory: PropTypes.func.isRequired,
    onCloseCards: PropTypes.func.isRequired,
    onDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onShowAll: PropTypes.func,
    onShrinkExpandCards: PropTypes.func.isRequired,
    onStartDrag: PropTypes.func,
    showVideos: PropTypes.bool,
    step: PropTypes.number.isRequired,
    x: PropTypes.number,
    y: PropTypes.number
};

Cards.defaultProps = {
    showVideos: true
};

export {
    Cards as default,
    // Others exported for testability
    ImageStep,
    VideoStep
};
