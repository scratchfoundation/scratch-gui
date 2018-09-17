import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './menu.css';

const MenuComponent = ({
    className = '',
    children,
    componentRef,
    place = 'right'
}) => (
    <ul
        className={classNames(
            styles.menu,
            className,
            {
                [styles.left]: place === 'left',
                [styles.right]: place === 'right'
            }
        )}
        ref={componentRef}
    >
        {children}
    </ul>
);

MenuComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    componentRef: PropTypes.func,
    place: PropTypes.oneOf(['left', 'right'])
};

// you can pass MenuItem an onClick function. If none is found, when clicked it
// looks for an href and navigates the web page to that.
class MenuItem extends React.Component {
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
            <li
                className={classNames(styles.menuItem, className)}
                onClick={clickAction}
            >
                {children}
            </li>
        );
    }
}

MenuItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func
};

const addDividerClassToFirstChild = (child, id) => (
    React.cloneElement(child, {
        className: classNames(child.className, {
            [styles.menuSection]: id === 0
        }),
        key: id
    })
);

const MenuSection = ({children}) => (
    <React.Fragment>{
        React.Children.map(children, addDividerClassToFirstChild)
    }</React.Fragment>
);

MenuSection.propTypes = {
    children: PropTypes.node
};

export {
    MenuComponent as default,
    MenuItem,
    MenuSection
};
