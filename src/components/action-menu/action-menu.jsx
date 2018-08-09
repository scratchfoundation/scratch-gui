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
            'clickDelayer',
            'handleClosePopover',
            'handleToggleOpenState',
            'handleTouchStart',
            'handleTouchOutside',
            'setButtonRef',
            'setContainerRef'
        ]);
        this.state = {
            isOpen: false,
            forceHide: false
        };
        this.mainTooltipId = `tooltip-${Math.random()}`;
    }
    componentDidMount () {
        // Touch start on the main button is caught to trigger open and not click
        this.buttonRef.addEventListener('touchstart', this.handleTouchStart);
        // Touch start on document is used to trigger close if it is outside
        document.addEventListener('touchstart', this.handleTouchOutside);
    }
    shouldComponentUpdate (newProps, newState) {
        // This check prevents re-rendering while the project is updating.
        // @todo check only the state and the title because it is enough to know
        //  if anything substantial has changed
        // This is needed because of the sloppy way the props are passed as a new object,
        //  which should be refactored.
        return newState.isOpen !== this.state.isOpen ||
            newState.forceHide !== this.state.forceHide ||
            newProps.title !== this.props.title;
    }
    componentWillUnmount () {
        this.buttonRef.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchstart', this.handleTouchOutside);
    }
    handleClosePopover () {
        this.closeTimeoutId = setTimeout(() => {
            this.setState({isOpen: false});
            this.closeTimeoutId = null;
        }, CLOSE_DELAY);
    }
    handleToggleOpenState () {
        // Mouse enter back in after timeout was started prevents it from closing.
        if (this.closeTimeoutId) {
            clearTimeout(this.closeTimeoutId);
            this.closeTimeoutId = null;
        } else if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
                forceHide: false
            });
        }
    }
    handleTouchOutside (e) {
        if (this.state.isOpen && !this.containerRef.contains(e.target)) {
            this.setState({isOpen: false});
            ReactTooltip.hide();
        }
    }
    clickDelayer (fn) {
        // Return a wrapped action that manages the menu closing.
        // @todo we may be able to use react-transition for this in the future
        // for now all this work is to ensure the menu closes BEFORE the
        // (possibly slow) action is started.
        return event => {
            ReactTooltip.hide();
            if (fn) fn(event);
            this.setState({forceHide: true, isOpen: false}, () => {
                setTimeout(() => this.setState({forceHide: false}));
            });
        };
    }
    handleTouchStart (e) {
        // Prevent this touch from becoming a click if menu is closed
        if (!this.state.isOpen) {
            e.preventDefault();
            this.handleToggleOpenState();
        }
    }
    setButtonRef (ref) {
        this.buttonRef = ref;
    }
    setContainerRef (ref) {
        this.containerRef = ref;
    }
    render () {
        const {
            className,
            img: mainImg,
            title: mainTitle,
            moreButtons,
            tooltipPlace,
            onClick
        } = this.props;

        return (
            <div
                className={classNames(styles.menuContainer, className, {
                    [styles.expanded]: this.state.isOpen,
                    [styles.forceHidden]: this.state.forceHide
                })}
                ref={this.setContainerRef}
                onMouseEnter={this.handleToggleOpenState}
                onMouseLeave={this.handleClosePopover}
            >
                <button
                    aria-label={mainTitle}
                    className={classNames(styles.button, styles.mainButton)}
                    data-for={this.mainTooltipId}
                    data-tip={mainTitle}
                    ref={this.setButtonRef}
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
                    id={this.mainTooltipId}
                    place={tooltipPlace || 'left'}
                />
                <div className={styles.moreButtonsOuter}>
                    <div className={styles.moreButtons}>
                        {(moreButtons || []).map(({img, title, onClick: handleClick,
                            fileAccept, fileChange, fileInput}, keyId) => {
                            const isComingSoon = !handleClick;
                            const hasFileInput = fileInput;
                            const tooltipId = `${this.mainTooltipId}-${title}`;
                            return (
                                <div key={`${tooltipId}-${keyId}`}>
                                    <button
                                        aria-label={title}
                                        className={classNames(styles.button, styles.moreButton, {
                                            [styles.comingSoon]: isComingSoon
                                        })}
                                        data-for={tooltipId}
                                        data-tip={title}
                                        onClick={hasFileInput ? handleClick : this.clickDelayer(handleClick)}
                                    >
                                        <img
                                            className={styles.moreIcon}
                                            draggable={false}
                                            src={img}
                                        />
                                        {hasFileInput ? (
                                            <input
                                                accept={fileAccept}
                                                className={styles.fileInput}
                                                ref={fileInput}
                                                type="file"
                                                onChange={fileChange}
                                            />) : null}
                                    </button>
                                    <ReactTooltip
                                        className={classNames(styles.tooltip, {
                                            [styles.comingSoonTooltip]: isComingSoon
                                        })}
                                        effect="solid"
                                        id={tooltipId}
                                        place={tooltipPlace || 'left'}
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
        onClick: PropTypes.func, // Optional, "coming soon" if no callback provided
        fileAccept: PropTypes.string, // Optional, only for file upload
        fileChange: PropTypes.func, // Optional, only for file upload
        fileInput: PropTypes.func // Optional, only for file upload
    })),
    onClick: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    tooltipPlace: PropTypes.string
};

export default ActionMenu;
