import {addLocaleData} from 'react-intl';

import {localeData} from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';

addLocaleData(localeData);

const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';

const initialState = {
    locale: 'en',
    messagesByLocale: editorMessages,
    messages: editorMessages.en
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SELECT_LOCALE:
        return Object.assign({}, state, {
            locale: action.locale,
            messagesByLocale: state.messagesByLocale,
            messages: state.messagesByLocale[action.locale]
        });
    case UPDATE_LOCALES:
        return Object.assign({}, state, {
            locale: state.locale,
            messagesByLocale: action.messagesByLocale,
            messages: action.messagesByLocale[state.locale]
        });
    default:
        return state;
    }
};

const selectLocale = function (locale) {
    return {
        type: SELECT_LOCALE,
        locale: locale
    };
};

const setLocales = function (localesMessages) {
    return {
        type: UPDATE_LOCALES,
        messagesByLocale: localesMessages
    };
};
const initLocale = function (currentState, locale) {
    if (currentState.messagesByLocale.hasOwnProperty(locale)) {
        return Object.assign(
            {},
            currentState,
            {
                locale: locale,
                messagesByLocale: currentState.messagesByLocale,
                messages: currentState.messagesByLocale[locale]
            }
        );
    }
    // don't change locale if it's not in the current messages
    return currentState;
};
export {
    reducer as default,
    initialState as localesInitialState,
    initLocale,
    selectLocale,
    setLocales
};
