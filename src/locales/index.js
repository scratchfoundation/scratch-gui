import messages from 'scratch-l10n/locales/editor-msgs';
import en from './en';
import ja from './ja';
import jaHira from './ja-Hira';

const langs = {
    "en": en,
    "ja": ja,
    "ja-Hira": jaHira
};

Object.keys(langs).forEach(lang => {
    if (messages[lang]) {
        Object.assign(messages[lang], langs[lang]);
    }
});

export default messages;
