import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {updateIntl} from 'react-intl-redux';
import {closeLanguageMenu} from '../reducers/menus';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

class LanguageSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addListeners',
            'removeListeners',
            'handleChange',
            'handleClick',
            'ref'
        ]);
        if (props.open) this.addListeners();
    }
    componentDidUpdate (prevProps) {
        if (this.props.open && !prevProps.open) this.addListeners();
        if (!this.props.open && prevProps.open) this.removeListeners();
    }
    addListeners () {
        document.addEventListener('mouseup', this.handleClick);
    }
    removeListeners () {
        document.removeEventListener('mouseup', this.handleClick);
    }
    handleChange (e) {
        this.props.onChangeLanguage(e.target.value);
    }
    handleClick (e) {
        if (this.props.open && this.selector && !this.selector.contains(e.target)) {
            this.props.onRequestClose();
        }
    }
    ref (c) {
        this.selector = c;
    }
    render () {
        const {
            open,
            onChangeLanguage, // eslint-disable-line no-unused-vars
            onRequestClose, // eslint-disable-line no-unused-vars
            children,
            ...props
        } = this.props;
        if (!open) return null;
        return (
            <LanguageSelectorComponent
                componentRef={this.ref}
                onChange={this.handleChange}
                {...props}
            >
                {children}
            </LanguageSelectorComponent>
        );
    }
}

LanguageSelector.propTypes = {
    children: PropTypes.node,
    onChangeLanguage: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    currentLocale: state.intl.locale
});

const mapDispatchToProps = dispatch => ({
    onChangeLanguage: locale => {
        dispatch(updateIntl({locale: locale, messages: {}}));
        dispatch(closeLanguageMenu());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelector);
