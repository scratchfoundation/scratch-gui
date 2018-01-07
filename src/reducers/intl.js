import {addLocaleData} from 'react-intl';
import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import {IntlProvider, intlReducer} from 'react-intl-redux';
import defaultsDeep from 'lodash.defaultsdeep';

import localeData from 'scratch-l10n';
import guiMessages from 'scratch-l10n/locales/gui-msgs';
import paintMessages from 'scratch-l10n/locales/paint-msgs';
import penMessages from 'scratch-l10n/locales/pen-msgs';

const combinedMessages = defaultsDeep({}, guiMessages.messages, paintMessages.messages, penMessages.messages);

Object.keys(localeData).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    addLocaleData(localeData[locale].localeData);
});

/**
 * 初始化 state
 */
const intlInitialState = {
    intl: {
        defaultLocale: 'zh',
        locale: 'zh',
        messages: combinedMessages.zh.messages
    }
};

const updateIntl = locale => superUpdateIntl({
    locale: locale,
    messages: combinedMessages[locale].messages || combinedMessages.zh.messages
});

export {
    intlReducer as default,
    IntlProvider,
    intlInitialState,
    updateIntl
};
