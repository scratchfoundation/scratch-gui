import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import languages from '../../languages.json';
import languageIcon from './language-icon.svg';
import styles from './language-selector.css';

const LanguageSelector = ({
    currentLocale,
    onChange,
    ...props
}) => (
    <Box {...props}>
        <div className={styles.group}>
            <img
                className={styles.languageIcon}
                src={languageIcon}
            />
            <select
                className={styles.languageSelect}
                value={currentLocale}
                onChange={onChange}
            >
                {Object.keys(languages).map(locale => (
                    <option
                        key={locale}
                        value={locale}
                    >
                        {languages[locale]}
                    </option>
                ))}
            </select>
        </div>
    </Box>
);


LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    onChange: PropTypes.func
};

export default LanguageSelector;
