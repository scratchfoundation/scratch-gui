import {addLocaleData} from 'react-intl';

import localeData from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';

Object.keys(localeData).forEach(locale => {
    addLocaleData(localeData[locale].localeData);
});

const intlDefault = {
    defaultLocale: 'en',
    locale: 'en',
    messages: editorMessages.en
};

export {
    intlDefault as default,
    editorMessages
};
