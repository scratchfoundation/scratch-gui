import translations from './translations.json';
import translationAliases from './aliases.json';

const mergeMessages = messages => {
    for (const language of Object.keys(translations)) {
        if (language.startsWith('_')) {
            continue;
        }
        const newMessages = translations[language];
        const aliases = translationAliases[language] || [language];
        for (const alias of aliases) {
            const languageMessages = messages[alias];
            if (languageMessages) {
                for (const messageId of Object.keys(newMessages)) {
                    languageMessages[messageId] = newMessages[messageId];
                }
            }
        }
    }
};

export default mergeMessages;
