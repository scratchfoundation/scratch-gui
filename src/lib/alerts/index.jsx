import React from 'react';
import {FormattedMessage} from 'react-intl';

import successImage from '../assets/icon--success.svg';

const AlertLevels = {
    SUCCESS: 'success',
    WARN: 'warn'
};

const alerts = [
    {
        alertId: 'createSuccess',
        iconURL: successImage,
        level: 'success',
        clearList: ['creating'],
        content: (
            <FormattedMessage
                defaultMessage="Successfully created."
                description="Message indicating that project was successfully created"
                id="gui.alerts.createsuccess"
            />
        )
    },
    {
        alertId: 'creating',
        level: 'warn',
        content: (
            <FormattedMessage
                defaultMessage="Creating..."
                description="Message indicating that project is in process of creating"
                id="gui.alerts.creating"
            />
        )
    },
    {
        alertId: 'saveSuccess',
        iconURL: successImage,
        level: 'success',
        clearList: ['saving'],
        content: (
            <FormattedMessage
                defaultMessage="Successfully saved."
                description="Message indicating that project was successfully saved"
                id="gui.alerts.savesuccess"
            />
        )
    },
    {
        alertId: 'saving',
        level: 'warn',
        content: (
            <FormattedMessage
                defaultMessage="Saving..."
                description="Message indicating that project is in process of saving"
                id="gui.alerts.saving"
            />
        )
    }
];

export {
    alerts as default,
    AlertLevels
};
