import {addLocaleData} from 'react-intl';
import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import {IntlProvider, intlReducer} from 'react-intl-redux';
import defaultsDeep from 'lodash.defaultsdeep';

import localeData from 'scratch-l10n';
import guiMessages from 'scratch-l10n/locales/gui-msgs';
import paintMessages from 'scratch-l10n/locales/paint-msgs';

const combinedMessages = defaultsDeep({}, guiMessages.messages, paintMessages.messages);

Object.keys(localeData).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    addLocaleData(localeData[locale].localeData);
});

const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: combinedMessages.en.messages
    }
};

const updateIntl = locale => superUpdateIntl({
    locale: locale,
    messages: combinedMessages[locale].messages || combinedMessages.en.messages
});

export {
    intlReducer as default,
    IntlProvider,
    intlInitialState,
    updateIntl
};
