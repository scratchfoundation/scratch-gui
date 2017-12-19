import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import locales from 'scratch-l10n';
import languageIcon from './language-icon.svg';
import styles from './language-selector.css';

const LanguageSelector = ({
    currentLocale,
    onChange,
    ...props
}) => (
    <Box {...props}>
        <ComingSoonTooltip
            place="bottom"
            tooltipId="language-selector"
        >
            <div className={styles.group}>
                <img
                    className={styles.languageIcon}
                    src={languageIcon}
                />
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
            </div>
        </ComingSoonTooltip>
    </Box>
);


LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    onChange: PropTypes.func
};

export default LanguageSelector;
