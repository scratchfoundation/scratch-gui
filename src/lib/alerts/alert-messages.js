import {defineMessages} from 'react-intl';

/* eslint-disable max-len */
export default defineMessages({
    savingErrorCostumeTooLarge: {
        defaultMessage: 'Project could not be saved because costume {assetName} was too large. Remove unnecessary parts and try again.',
        description: 'Message indicating that project could not be saved due to a large costume',
        id: 'gui.alerts.savingErrorCostumeTooLarge'
    },
    savingErrorBackdropTooLarge: {
        defaultMessage: 'Project could not be saved because backdrop {assetName} was too large. Remove unnecessary parts and try again.',
        description: 'Message indicating that project could not be saved due to a large backdrop',
        id: 'gui.alerts.savingErrorBackdropTooLarge'
    },
    savingErrorSoundTooLarge: {
        defaultMessage: 'Project could not be saved because sound {assetName} was too large. Split the sound using Copy to New button and try again.',
        description: 'Message indicating that project could not be saved due to a large sound',
        id: 'gui.alerts.savingErrorSoundTooLarge'
    }
});
/* eslint-enable max-len */
