import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import {messages} from '../../locale/messages.json';

export {intlReducer as default} from 'react-intl-redux';
export const updateIntl = locale => superUpdateIntl(locale, messages[locale] || messages.en);
