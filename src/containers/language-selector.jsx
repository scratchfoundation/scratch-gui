import {connect} from 'react-redux';
import {updateIntl} from '../reducers/intl.js';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

const mapStateToProps = state => ({
    currentLocale: state.intl.locale
});

const mapDispatchToProps = dispatch => ({
    onChange: e => {
        e.preventDefault();
        dispatch(updateIntl(e.target.value));
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelectorComponent);
