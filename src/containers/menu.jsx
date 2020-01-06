import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import MenuComponent from '../components/menu/menu.jsx';

class Menu extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addListeners',
            'removeListeners',
            'handleClick',
            'ref'
        ]);
    }
    componentDidMount () {
        if (this.props.open) this.addListeners();
    }
    componentDidUpdate (prevProps) {
        if (this.props.open && !prevProps.open) this.addListeners();
        if (!this.props.open && prevProps.open) this.removeListeners();
    }
    componentWillUnmount () {
        this.removeListeners();
    }
    addListeners () {
        document.addEventListener('mouseup', this.handleClick);
    }
    removeListeners () {
        document.removeEventListener('mouseup', this.handleClick);
    }
    elementIsModal (element) {
        const modalPortals = document.getElementsByClassName('ReactModalPortal');
        for (let i = 0; i < modalPortals.length; i++) {
            if (modalPortals[i].contains(element)) return true;
        }
        return false;
    }
    handleClick (e) {
        // request close, if menu is open, click was not inside menu, and click
        // was not inside modal. This prevents menu from closing when it is in
        // background.
        if (this.props.open && !this.menu.contains(e.target) && !this.elementIsModal(e.target)) {
            this.props.onRequestClose();
        }
    }
    ref (c) {
        this.menu = c;
    }
    render () {
        const {
            open,
            children,
            ...props
        } = this.props;
        if (!open) return null;
        return (
            <MenuComponent
                componentRef={this.ref}
                {...props}
            >
                {children}
            </MenuComponent>
        );
    }
}

Menu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default Menu;
