import {addLocaleData} from 'react-intl';
import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import languages from '../languages.json';
import messages from '../../locale/messages.json';
import {IntlProvider, intlReducer} from 'react-intl-redux';

Object.keys(languages).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    import(`react-intl/locale-data/${locale}`).then(data => addLocaleData(data));
});

const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: messages.en
    }
};

const updateIntl = locale => superUpdateIntl({
    locale: locale,
    messages: messages[locale] || messages.en
});

export {intlReducer as default, IntlProvider, intlInitialState, updateIntl};
