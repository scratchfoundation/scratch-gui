import es from './languages/es.json';
import ja from './languages/ja.json';

const languages = {
    es,
    ja
};

const mergeMessages = messages => {
    for (const language of Object.keys(languages)) {
        const languageMessages = messages[language];
        const newMessages = languages[language];
        for (const messageId of Object.keys(newMessages)) {
            languageMessages[messageId] = newMessages[messageId];
        }
    }
};

export default mergeMessages;
