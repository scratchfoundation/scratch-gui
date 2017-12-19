import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './coming-soon.css';

import awwCatIcon from './aww-cat.png';
import coolCatIcon from './cool-cat.png';

const messages = defineMessages({
    message1: {
        defaultMessage: 'Don\'t worry, we\'re on it {emoji}',
        description: 'One of the "coming soon" random messages for yet-to-be-done features',
        id: 'gui.comingSoon.message1'
    },
    message2: {
        defaultMessage: 'Coming Soon...',
        description: 'One of the "coming soon" random messages for yet-to-be-done features',
        id: 'gui.comingSoon.message2'
    },
    message3: {
        defaultMessage: 'We\'re working on it {emoji}',
        description: 'One of the "coming soon" random messages for yet-to-be-done features',
        id: 'gui.comingSoon.message3'
    }
});

class ComingSoonContent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getRandomMessage'
        ]);
    }
    getRandomMessage () {
        // randomly chooses a messages from `messages` to display in the tooltip.
        const images = [awwCatIcon, coolCatIcon];
        const messageNumber = Math.floor(Math.random() * Object.keys(messages).length) + 1;
        const imageNumber = Math.floor(Math.random() * Object.keys(images).length);
        return (
            <FormattedMessage
                {...messages[`message${messageNumber}`]}
                values={{
                    emoji: (
                        <img
                            className={styles.comingSoonImage}
                            src={images[imageNumber]}
                        />
                    )
                }}
            />
        );
    }
    render () {
        return (
            <ReactTooltip
                className={classNames(
                    styles.comingSoon,
                    this.props.className,
                    {
                        [styles.left]: (this.props.place === 'left'),
                        [styles.right]: (this.props.place === 'right'),
                        [styles.top]: (this.props.place === 'top'),
                        [styles.bottom]: (this.props.place === 'bottom')
                    }
                )}
                getContent={this.getRandomMessage}
                id={this.props.tooltipId}
            />
        );
    }
}

ComingSoonContent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipId: PropTypes.string.isRequired
};

ComingSoonContent.defaultProps = {
    place: 'bottom'
};

const ComingSoon = injectIntl(ComingSoonContent);

const ComingSoonTooltip = props => (
    <div className={props.className}>
        <div
            data-delay-hide={0}
            data-delay-show={0}
            data-effect="solid"
            data-for={props.tooltipId}
            data-place={props.place}
            data-tip="tooltip"
        >
            {props.children}
        </div>
        <ComingSoon
            className={props.tooltipClassName}
            place={props.place}
            tooltipId={props.tooltipId}
        />
    </div>
);

ComingSoonTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired
};

export {
    ComingSoon as ComingSoonComponent,
    ComingSoonTooltip
};
