import {intlReducer} from 'react-intl-redux';

const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: {}
    }
};

export {
    intlReducer as default,
    intlInitialState
};
