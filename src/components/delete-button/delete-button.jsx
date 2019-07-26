import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';

import styles from './delete-button.css';
import deleteIcon from './icon--delete.svg';

class DeleteButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyPress',
            'setRef'
        ]);
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    setRef (ref) {
        this.ref = ref;
    }
    handleKeyPress (event) {
        if (this.ref === event.currentTarget.activeElement && (event.key === 'Enter' || event.key === ' ')) {
            this.props.onClick(event);
            event.preventDefault();
        }
    }
    render () {
        return (
            <div
                aria-label="Delete"
                className={classNames(
                    styles.deleteButton,
                    this.props.className
                )}
                ref={this.setRef}
                role="button"
                tabIndex={this.props.tabIndex}
                onClick={this.props.onClick}
            >
                <div className={styles.deleteButtonVisible}>
                    <img
                        className={styles.deleteIcon}
                        draggable={false}
                        src={deleteIcon}
                    />
                </div>
            </div>
        );
    }
}

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

DeleteButton.defaultProps = {
    tabIndex: 0
};

export default DeleteButton;
