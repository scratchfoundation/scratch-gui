import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import locales from 'scratch-l10n';
import languageIcon from './language-icon.svg';
import dropdownCaret from './dropdown-caret.svg';
import styles from './language-selector.css';

const LanguageSelector = ({
    currentLocale,
    onChange,
    open,
    ...props
}) => (
    <Box {...props}>
        <div className={styles.group}>
            {open ? (
                <select
                    disabled
                    aria-label="language selector"
                    className={styles.languageSelect}
                    value={currentLocale}
                    onChange={onChange}
                >
                    {Object.keys(locales).map(locale => (
                        <option
                            key={locale}
                            value={locale}
                        >
                            {locales[locale].name}
                        </option>
                    ))}
                </select>
            ) : (
                <React.Fragment>
                    <img
                        className={classNames(styles.languageIcon, styles.disabled)}
                        src={languageIcon}
                    />
                    <img
                        className={classNames(styles.dropdownCaret, styles.disabled)}
                        src={dropdownCaret}
                    />
                </React.Fragment>
            )}
        </div>
    </Box>
);


LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    onChange: PropTypes.func,
    open: PropTypes.bool
};

export default LanguageSelector;
