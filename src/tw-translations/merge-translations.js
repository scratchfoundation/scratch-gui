import translations from './translations.json';

const mergeMessages = messages => {
    for (const language of Object.keys(translations)) {
        const languageMessages = messages[language];
        const newMessages = translations[language];
        for (const messageId of Object.keys(newMessages)) {
            languageMessages[messageId] = newMessages[messageId];
        }
    }
};

export default mergeMessages;
