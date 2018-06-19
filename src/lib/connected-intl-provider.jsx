import {IntlProvider as ReactIntlProvider} from 'react-intl';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    key: state.scratchGui.locales.locale,
    locale: state.scratchGui.locales.locale,
    messages: state.scratchGui.locales.messages[state.scratchGui.locales.locale]
});

export default connect(mapStateToProps)(ReactIntlProvider);
