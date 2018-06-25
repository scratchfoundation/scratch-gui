import {IntlProvider as ReactIntlProvider} from 'react-intl';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    key: state.locales.locale,
    locale: state.locales.locale,
    messages: state.locales.messages
});

export default connect(mapStateToProps)(ReactIntlProvider);
