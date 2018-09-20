import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import {MenuItem} from '../components/menu/menu.jsx';

class MenuItemContainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'navigateToHref'
        ]);
    }
    navigateToHref () {
        if (this.props.href) window.location.href = this.props.href;
    }
    render () {
        const {
            children,
            className,
            onClick
        } = this.props;
        const clickAction = onClick ? onClick : this.navigateToHref;
        return (
            <MenuItem
                className={className}
                onClick={clickAction}
            >
                {children}
            </MenuItem>
        );
    }
}

MenuItemContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    // can take an onClick prop, or take an href and build an onClick handler
    href: PropTypes.string,
    onClick: PropTypes.func
};

export default MenuItemContainer;
