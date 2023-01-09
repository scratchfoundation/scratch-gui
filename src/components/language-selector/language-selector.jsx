import PropTypes from 'prop-types';
import React from 'react';
import {MenuItem, MenuSection} from '../menu/menu.jsx';

import locales from 'scratch-l10n';

// supported languages to exclude from the menu, but allow as a URL option
const ignore = [];

const LanguageSelector = ({currentLocale, label, onChange, isRtl}) => (
    <>
        {
            Object.keys(locales)
                .filter(l => !ignore.includes(l))
                .map(locale => (
                    <MenuItem
                        key={locale}
                        isRtl={isRtl}
                        onClick={onChange.bind(null, { target: { value: locale }})}
                    >
                        {locales[locale].name}
                    </MenuItem>
                ))
        }
    </>
);

LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    isRtl: PropTypes.bool
};

export default LanguageSelector;
