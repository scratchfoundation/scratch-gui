import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import ReactTooltip from 'react-tooltip';

import styles from './action-menu.css';

const CLOSE_DELAY = 300; // ms

class ActionMenu extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClosePopover',
            'handleToggleOpenState',
            'clickDelayer'
        ]);
        this.state = {
            isOpen: false,
            forceHide: false
        };
    }
    handleClosePopover () {
        this.closeTimeoutId = setTimeout(() => {
            this.setState({isOpen: false});
            this.closeTimeoutId = null;
        }, CLOSE_DELAY);
    }
    handleToggleOpenState (e) {
        if (!this.state.isOpen) {
            e.stopPropagation(); // For touch start, to prevent clicking primary button
        }

        // Mouse enter back in after timeout was started prevents it from closing.
        if (this.closeTimeoutId) {
            clearTimeout(this.closeTimeoutId);
            this.closeTimeoutId = null;
        } else {
            this.setState({
                isOpen: true,
                forceHide: false
            });
        }
    }
    clickDelayer (fn) {
        // Return a wrapped action that manages the menu closing.
        // @todo we may be able to use react-transition for this in the future
        // for now all this work is to ensure the menu closes BEFORE the
        // (possibly slow) action is started.
        return event => {
            this.setState({forceHide: true, isOpen: false}, () => {
                if (fn) fn(event);
                setTimeout(() => this.setState({forceHide: false}));
            });
        };
    }
    render () {
        const {
            className,
            img: mainImg,
            title: mainTitle,
            moreButtons,
            onClick
        } = this.props;

        const mainTooltipId = `tooltip-${Math.random()}`;

        return (
            <div
                className={classNames(styles.menuContainer, className, {
                    [styles.expanded]: this.state.isOpen,
                    [styles.forceHidden]: this.state.forceHide
                })}
                onMouseEnter={this.handleToggleOpenState}
                onMouseLeave={this.handleClosePopover}
                onTouchStart={this.handleToggleOpenState}
            >
                <button
                    aria-label={mainTitle}
                    className={classNames(styles.button, styles.mainButton)}
                    data-for={mainTooltipId}
                    data-tip={mainTitle}
                    onClick={this.clickDelayer(onClick)}
                >
                    <img
                        className={styles.mainIcon}
                        draggable={false}
                        src={mainImg}
                    />
                </button>
                <ReactTooltip
                    className={styles.tooltip}
                    effect="solid"
                    id={mainTooltipId}
                    place="left"
                />
                <div className={styles.moreButtonsOuter}>
                    <div className={styles.moreButtons}>
                        {(moreButtons || []).map(({img, title, onClick: handleClick}) => {
                            const isComingSoon = !handleClick;
                            const tooltipId = `tooltip-${Math.random()}`;
                            return (
                                <div key={tooltipId}>
                                    <button
                                        aria-label={title}
                                        className={classNames(styles.button, styles.moreButton, {
                                            [styles.comingSoon]: isComingSoon
                                        })}
                                        data-for={tooltipId}
                                        data-tip={title}
                                        onClick={this.clickDelayer(handleClick)}
                                    >
                                        <img
                                            className={styles.moreIcon}
                                            draggable={false}
                                            src={img}
                                        />
                                    </button>
                                    <ReactTooltip
                                        className={classNames(styles.tooltip, {
                                            [styles.comingSoonTooltip]: isComingSoon
                                        })}
                                        effect="solid"
                                        id={tooltipId}
                                        place="left"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

ActionMenu.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string,
    moreButtons: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.node.isRequired,
        onClick: PropTypes.func // Optional, "coming soon" if no callback provided
    })),
    onClick: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired
};

export default ActionMenu;
