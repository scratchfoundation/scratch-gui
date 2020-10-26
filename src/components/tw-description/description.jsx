import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import styles from './description.css';
import reactStringReplace from 'react-string-replace';

const decorate = text => {
    // https://github.com/LLK/scratch-www/blob/25232a06bcceeaddec8fcb24fb63a44d870cf1cf/src/lib/decorate-text.jsx

    // Make @mentions clickable
    text = reactStringReplace(text, /@([\w-]+)/, (match, i) => (
        <a
            href={`https://scratch.mit.edu/users/${match}/`}
            rel="noreferrer"
            key={match + i}
        >
            {`@${match}`}
        </a>
    ));

    // Make links clickable
    const linkRegex = /((?:^|\s)https?:\/\/(?:[\w-]+\.)*(?:.+)(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
    text = reactStringReplace(text, linkRegex, (match, i) => (
        <a
            href={match}
            rel="noreferrer"
            key={match + i}
        >
            {match}
        </a>
    ));

    return text;
};

const Description = ({
    instructions,
    credits
}) => (
    <div className={styles.description}>
        {instructions ? (
            <div>
                <div className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Instructions"
                        description="Header for instructions section of description"
                        id="tw.home.instructions"
                    />
                </div>
                {decorate(instructions)}
            </div>
        ) : null}
        {instructions && credits ? (
            <div className={styles.divider} />
        ) : null}
        {credits ? (
            <div>
                <div className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Notes and Credits"
                        description="Header for notes and credits section of description"
                        id="tw.home.credit"
                    />
                </div>
                {decorate(credits)}
            </div>
        ) : null}
    </div>
);

Description.propTypes = {
    instructions: PropTypes.string,
    credits: PropTypes.string
};

export default Description;
