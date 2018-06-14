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
            'handleChange'
        ]);
    }
    handleChange (e) {
        this.props.onChangeLanguage(e.target.value);
    }
    render () {
        const {
            onChangeLanguage, // eslint-disable-line no-unused-vars
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
    onChangeLanguage: PropTypes.func.isRequired
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
