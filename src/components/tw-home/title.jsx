import React from 'react';
import {FormattedMessage} from 'react-intl';

import styles from './title.css';

const About = () => {
    return (
        <div className={styles.title}>
            <h1>TurboWarp</h1>
            <span className={styles.subtitles}>
                <div>
                    <FormattedMessage
                        defaultMessage="Unofficial Scratch Mod"
                        description="Text for explaining this is an unofficial mod of scratch on the home page"
                        id="tw.home.mod"
                    />
                </div>
                <div>
                    <a href="https://github.com/TurboWarp/">
                        <FormattedMessage
                            defaultMessage="Source Code"
                            description="Text for source code link on the home page"
                            id="tw.home.code"
                        />
                    </a>
                    &nbsp;-&nbsp;
                    <a href="/privacy.html">
                        <FormattedMessage
                            defaultMessage="Privacy"
                            description="Text for privacy policy link on the home page"
                            id="tw.home.privacy"
                        />
                    </a>
                </div>
            </span>
        </div>
    );
};

export default About;
