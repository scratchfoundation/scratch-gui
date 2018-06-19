import {addLocaleData} from 'react-intl';

import {localeData} from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';

addLocaleData(localeData);

const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';

const initialState = {
    locale: 'en',
    messages: editorMessages
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SELECT_LOCALE:
        return Object.assign({}, state, {
            locale: action.locale,
            messages: state.messages
        });
    case UPDATE_LOCALES:
        return Object.assign({}, state, {
            locale: state.locale,
            messages: action.messages
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
        messages: localesMessages
    };
};

export {
    reducer as default,
    initialState as localesInitialState,
    selectLocale,
    setLocales
};
