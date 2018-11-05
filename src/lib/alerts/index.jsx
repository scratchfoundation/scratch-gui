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
        clearList: ['creating'],
        content: (
            <FormattedMessage
                defaultMessage="Successfully created."
                description="Message indicating that project was successfully created"
                id="gui.alerts.createsuccess"
            />
        ),
        iconURL: successImage,
        level: 'success'
    },
    {
        alertId: 'creating',
        content: (
            <FormattedMessage
                defaultMessage="Creating..."
                description="Message indicating that project is in process of creating"
                id="gui.alerts.creating"
            />
        ),
        level: 'success'
    },
    {
        alertId: 'saveSuccess',
        clearList: ['saving'],
        content: (
            <FormattedMessage
                defaultMessage="Successfully saved."
                description="Message indicating that project was successfully saved"
                id="gui.alerts.savesuccess"
            />
        ),
        iconURL: successImage,
        level: 'success'
    },
    {
        alertId: 'saving',
        content: (
            <FormattedMessage
                defaultMessage="Saving..."
                description="Message indicating that project is in process of saving"
                id="gui.alerts.saving"
            />
        ),
        level: 'success'
    }
];

export {
    alerts as default,
    AlertLevels
};
