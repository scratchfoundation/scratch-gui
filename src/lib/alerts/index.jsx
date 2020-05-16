import React from 'react';
import {FormattedMessage} from 'react-intl';
import keyMirror from 'keymirror';

import alertMessages from './alert-messages';

import successImage from '../assets/icon--success.svg';

const AlertTypes = keyMirror({
    STANDARD: null,
    EXTENSION: null,
    INLINE: null
});

const AlertLevels = {
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn'
};

const SAVING_INFO = [
    'createSuccess',
    'creating',
    'createCopySuccess',
    'creatingCopy',
    'createRemixSuccess',
    'creatingRemix',
    'saveSuccess',
    'saving'
];

const SAVING = [
    'saving',
    'saveSuccess',
    'savingError',
    'savingErrorCostumeTooLarge',
    'savingErrorBackdropTooLarge',
    'savingErrorSoundTooLarge',
    'savingErrorJSONTooLarge',
    'savingErrorNetworkProblems',
    'savingErrorServerProblems',
    'savingErrorInvalidSession'
];

/* eslint-disable max-len */

const alerts = [
    {
        alertId: 'createSuccess',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="New project created."
                description="Message indicating that project was successfully created"
                id="gui.alerts.createsuccess"
            />
        ),
        iconURL: successImage,
        level: AlertLevels.SUCCESS,
        maxDisplaySecs: 5
    },
    {
        alertId: 'createCopySuccess',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="Project saved as a copy."
                description="Message indicating that project was successfully created"
                id="gui.alerts.createcopysuccess"
            />
        ),
        iconURL: successImage,
        level: AlertLevels.SUCCESS,
        maxDisplaySecs: 5
    },
    {
        alertId: 'createRemixSuccess',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="Project saved as a remix."
                description="Message indicating that project was successfully created"
                id="gui.alerts.createremixsuccess"
            />
        ),
        iconURL: successImage,
        level: AlertLevels.SUCCESS,
        maxDisplaySecs: 5
    },
    {
        alertId: 'creating',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="Creating new…"
                description="Message indicating that project is in process of creating"
                id="gui.alerts.creating"
            />
        ),
        iconSpinner: true,
        level: AlertLevels.SUCCESS
    },
    {
        alertId: 'creatingCopy',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="Copying project…"
                description="Message indicating that project is in process of copying"
                id="gui.alerts.creatingCopy"
            />
        ),
        iconSpinner: true,
        level: AlertLevels.SUCCESS
    },
    {
        alertId: 'creatingRemix',
        alertType: AlertTypes.STANDARD,
        clearList: SAVING_INFO,
        content: (
            <FormattedMessage
                defaultMessage="Remixing project…"
                description="Message indicating that project is in process of remixing"
                id="gui.alerts.creatingRemix"
            />
        ),
        iconSpinner: true,
        level: AlertLevels.SUCCESS
    },
    {
        alertId: 'creatingError',
        clearList: SAVING_INFO,
        closeButton: true,
        content: (
            <FormattedMessage
                defaultMessage="Could not create the project. Please try again!"
                description="Message indicating that project could not be created"
                id="gui.alerts.creatingError"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingError',
        clearList: SAVING_INFO,
        showDownload: true,
        showSaveNow: true,
        closeButton: false,
        content: (
            <FormattedMessage
                defaultMessage="Project could not save."
                description="Message indicating that project could not be saved"
                id="gui.alerts.savingError"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorCostumeTooLarge',
        clearList: SAVING_INFO,
        showDownload: true,
        closeButton: true,
        content: (formatMessage, assetName) => formatMessage(alertMessages.savingErrorCostumeTooLarge, {assetName}),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorBackdropTooLarge',
        clearList: SAVING_INFO,
        showDownload: true,
        closeButton: true,
        content: (formatMessage, assetName) => formatMessage(alertMessages.savingErrorBackdropTooLarge, {assetName}),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorSoundTooLarge',
        clearList: SAVING_INFO,
        showDownload: true,
        closeButton: true,
        content: (formatMessage, assetName) => formatMessage(alertMessages.savingErrorSoundTooLarge, {assetName}),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorJSONTooLarge',
        clearList: SAVING_INFO,
        showDownload: true,
        closeButton: true,
        content: (
            <FormattedMessage
                defaultMessage="Project could not be saved because it is too large. Remove unused code or reduce list sizes and try again."
                description="Message indicating that project could not be saved because it is too large"
                id="gui.alerts.savingErrorJSONTooLarge"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorNetworkProblems',
        clearList: SAVING_INFO,
        showDownload: true,
        showSaveNow: true,
        closeButton: false,
        content: (
            <FormattedMessage
                defaultMessage="Project could not be saved due to network problems. Check your Internet connection. You can also download the project."
                description="Message indicating that project could not be saved due to network problems"
                id="gui.alerts.savingErrorNetworkProblems"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorServerProblems',
        clearList: SAVING_INFO,
        showDownload: true,
        showSaveNow: true,
        closeButton: false,
        content: (
            <FormattedMessage
                defaultMessage="It looks like our server has some problems. Download the project and try again later."
                description="Message indicating that project could not be saved due to server problems"
                id="gui.alerts.savingErrorServerProblems"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'savingErrorInvalidSession',
        clearList: SAVING_INFO,
        showDownload: true,
        showSaveNow: false,
        closeButton: false,
        content: (
            <FormattedMessage
                defaultMessage="It looks like you are logged out of Scratch. Download the project, log in and try again."
                description="Message indicating that project could not be saved because the user is logged out"
                id="gui.alerts.savingErrorInvalidSession"
            />
        ),
        level: AlertLevels.WARN
    },
    {
        alertId: 'saveSuccess',
        alertType: AlertTypes.INLINE,
        clearList: SAVING,
        content: (
            <FormattedMessage
                defaultMessage="Project saved."
                description="Message indicating that project was successfully saved"
                id="gui.alerts.savesuccess"
            />
        ),
        iconURL: successImage,
        level: AlertLevels.SUCCESS,
        maxDisplaySecs: 3
    },
    {
        alertId: 'saving',
        alertType: AlertTypes.INLINE,
        clearList: SAVING,
        content: (
            <FormattedMessage
                defaultMessage="Saving project…"
                description="Message indicating that project is in process of saving"
                id="gui.alerts.saving"
            />
        ),
        iconSpinner: true,
        level: AlertLevels.INFO
    },
    {
        alertId: 'cloudInfo',
        alertType: AlertTypes.STANDARD,
        clearList: ['cloudInfo'],
        content: (
            <FormattedMessage
                defaultMessage="Please note, cloud variables only support numbers, not letters or symbols. {learnMoreLink}" // eslint-disable-line max-len
                description="Info about cloud variable limitations"
                id="gui.alerts.cloudInfo"
                values={{
                    learnMoreLink: (
                        <a
                            href="https://scratch.mit.edu/info/faq/#clouddata"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <FormattedMessage
                                defaultMessage="Learn more."
                                description="Link text to cloud var faq"
                                id="gui.alerts.cloudInfoLearnMore"
                            />
                        </a>
                    )
                }}
            />
        ),
        closeButton: true,
        level: AlertLevels.SUCCESS,
        maxDisplaySecs: 15
    },
    {
        alertId: 'importingAsset',
        alertType: AlertTypes.STANDARD,
        clearList: [],
        content: (
            <FormattedMessage
                defaultMessage="Importing…"
                description="Message indicating that project is in process of importing"
                id="gui.alerts.importing"
            />
        ),
        iconSpinner: true,
        level: AlertLevels.SUCCESS
    }
];

/* eslint-enable max-len */

export {
    alerts as default,
    AlertLevels,
    AlertTypes
};
