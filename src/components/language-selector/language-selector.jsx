import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import locales from 'scratch-l10n';
import styles from './language-selector.css';

class LanguageSelector extends React.Component {
    render () {
        const {
            componentRef,
            currentLocale,
            onChange,
            ...componentProps
        } = this.props;
        return (
            <Box
                {...componentProps}
            >
                <div
                    className={styles.group}
                    ref={componentRef}
                >
                    <select
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
            </Box>
        );
    }
}

LanguageSelector.propTypes = {
    componentRef: PropTypes.func,
    currentLocale: PropTypes.string,
    onChange: PropTypes.func,
    open: PropTypes.bool
};

export default LanguageSelector;
