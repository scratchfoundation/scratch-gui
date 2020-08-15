import React from 'react';
import {FormattedMessage} from 'react-intl';

const isFirefox = /Firefox/.test(navigator.userAgent);

const About = () => (
    <React.Fragment>
        <p>
            <FormattedMessage
                defaultMessage="TurboWarp compiles Scratch projects to JavaScript to make them run faster. Try it out by inputting a project ID or URL and pressing enter or choosing an example project below."
                description="Description of TurboWarp"
                id="tw.home.description"
            />
        </p>
        <p>
            {isFirefox ? (
                <FormattedMessage
                    defaultMessage="Firefox users: Use Google Chrome for up to 4x better performance (see Bugzilla ID 1317690)"
                    description="Warning for firefox users about performance."
                    id="tw.home.ffWarning"
                />
            ) : null}
        </p>
    </React.Fragment>
);

export default About;
