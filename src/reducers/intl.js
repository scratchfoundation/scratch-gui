import {addLocaleData} from 'react-intl';
import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import languages from '../languages.json';
import messages from '../../locale/messages.json';

export {IntlProvider, intlReducer as default} from 'react-intl-redux';

Object.keys(languages).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    const data = require(`react-intl/locale-data/${locale}`);
    addLocaleData(data);
});

// start with English
export const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: messages.en
    }
};

export const updateIntl = locale => superUpdateIntl({
    locale: locale,
    messages: messages[locale] || messages.en
});
