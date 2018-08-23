import bindAll from 'lodash.bindall';
import classNames from 'classnames';
// NOTE: react-onclickoutside should be removed from package.json when this component is removed or consolidated with www
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './dropdown.css';

class Dropdown extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickOutside'
        ]);
    }
    handleClickOutside () {
        if (this.props.isOpen) {
            this.props.onRequestClose();
        }
    }
    render () {
        return (
            <this.props.as
                className={classNames(styles.dropdown, this.props.className, {
                    [styles.dropdownOpen]: this.props.isOpen
                })}
            >
                {this.props.children}
            </this.props.as>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
    as: 'div',
    isOpen: false
};

export default onClickOutside(Dropdown);
