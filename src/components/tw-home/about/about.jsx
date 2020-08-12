import React from 'react';
import {FormattedMessage} from 'react-intl';

const About = () => {
    return (
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="TurboWarp compiles Scratch projects to JavaScript to make them run faster. Try it out by inputting a project ID or URL and pressing enter, or choosing an example project below."
                    description="Description of TurboWarp"
                    id="tw.home.description"
                />
            </p>
        </div>
    );
};

export default About;
