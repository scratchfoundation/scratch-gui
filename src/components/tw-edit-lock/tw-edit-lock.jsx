import React from 'react';
import {FormattedMessage} from 'react-intl';

import styles from './tw-edit-lock.css';

const EditorLock = () => (
    <div className={styles.overlay}>
        <div>
            <h2>
                <FormattedMessage
                    defaultMessage="Editor is locked."
                    description="Large header for when the editor is locked."
                    id="tw.editorLock.header"
                />
            </h2>
            <p>
                <FormattedMessage
                    defaultMessage="Disable cloud variables to unlock."
                    description="Subtitle for when the editor is locked."
                    id="tw.editorLock.subtitle"
                />
            </p>
        </div>
    </div>
);

export default EditorLock;
