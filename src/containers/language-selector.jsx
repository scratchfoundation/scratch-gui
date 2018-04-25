import {connect} from 'react-redux';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

const mapStateToProps = state => ({
    currentLocale: state.intl.locale
});

const mapDispatchToProps = () => ({
    onChange: e => {
        e.preventDefault();
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageSelectorComponent);
