import messages from 'scratch-l10n/locales/editor-msgs';
import en from './en';
import ja from './ja';
import jaHira from './ja-Hira';

Object.assign(messages.en, en);
Object.assign(messages.ja, ja);
Object.assign(messages['ja-Hira'], jaHira);

export default messages;
