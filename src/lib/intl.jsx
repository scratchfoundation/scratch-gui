import {addLocaleData} from 'react-intl';
import languages from '../../languages.json';
import messages from '../../locale/messages.json';

export {IntlProvider, intlReducer} from 'react-intl-redux';

Object.keys(languages).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    const data = require(`react-intl/locale-data/${locale}`);
    addLocaleData(data);
});

export const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: messages.en
    }
};
