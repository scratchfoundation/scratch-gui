import React from 'react';
import {FormattedMessage} from 'react-intl';

const About = () => {
    return (
        <p>
            <FormattedMessage
                defaultMessage="TurboWarp compiles Scratch projects to JavaScript to make them run faster. Try it out by inputting a project ID or URL and pressing enter. Visit {studioLink} for some examples."
                description="Description of TurboWarp"
                id="tw.home.description"
                values={{
                    studioLink: (
                        <a href="https://scratch.mit.edu/studios/27205657/">
                            <FormattedMessage
                                defaultMessage="this studio"
                                description="link to turbowarp examples studio"
                                id="tw.home.description.studioLink"
                            />
                        </a>
                    )
                }}
            />
        </p>
    );
};

export default About;
