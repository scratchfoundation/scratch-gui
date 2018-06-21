import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {selectLocale} from '../reducers/locales';
import {closeLanguageMenu} from '../reducers/menus';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

class LanguageSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChange'
        ]);
    }
    handleChange (e) {
        const newLocale = e.target.value;
        if (this.props.supportedLocales.includes(newLocale)) {
            this.props.onChangeLanguage(newLocale);
        }
    }
    render () {
        const {
            onChangeLanguage, // eslint-disable-line no-unused-vars
            supportedLocales, // eslint-disable-line no-unused-vars
            children,
            ...props
        } = this.props;
        return (
            <LanguageSelectorComponent
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
    currentLocale: PropTypes.string.isRequired,
    onChangeLanguage: PropTypes.func.isRequired,
    supportedLocales: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
    currentLocale: state.locales.locale,
    supportedLocales: Object.keys(state.locales.messagesByLocale)
});

const mapDispatchToProps = dispatch => ({
    onChangeLanguage: locale => {
        dispatch(selectLocale(locale));
        dispatch(closeLanguageMenu());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelector);
