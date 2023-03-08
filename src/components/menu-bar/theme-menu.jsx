import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import MenuBarMenu from './menu-bar-menu.jsx';
import {DEFAULT_THEME, HIGH_CONTRAST_THEME, themeMap} from '../../lib/themes';
import {MenuItem, MenuSection} from '../menu/menu.jsx';

import dropdownCaret from './dropdown-caret.svg';

import styles from './theme-menu.css';
import menuBarStyles from './menu-bar.css';

const ThemeMenuItem = props => {
    const themeInfo = themeMap[props.theme];

    return (
        <MenuItem
            isRtl={props.isRtl}
            onClick={props.onClick}
            className={classNames({[styles.themeActive]: props.isSelected})}
        >
            <div className={styles.themeOption}>
                <img src={themeInfo.icon} />
                <FormattedMessage {...themeInfo.label} />
            </div>
        </MenuItem>);
};

ThemeMenuItem.propTypes = {
    isRtl: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    theme: PropTypes.string
};

const ThemeMenu = props => {
    const enabledThemes = [DEFAULT_THEME, HIGH_CONTRAST_THEME];
    const themeInfo = themeMap[props.theme];

    return (<div
        className={classNames(menuBarStyles.menuBarItem, menuBarStyles.hoverable, menuBarStyles.themeMenu, {
            [menuBarStyles.active]: props.themeMenuOpen
        })}
        onMouseUp={props.onRequestOpen}
    >
        <img
            className={styles.themeIcon}
            src={themeInfo.icon}
        />
        <span className={styles.themeLabel}>
            <FormattedMessage {...themeInfo.label} />
        </span>
        <img
            className={styles.themeCaret}
            src={dropdownCaret}
        />
        <MenuBarMenu
            className={menuBarStyles.menuBarMenu}
            open={props.themeMenuOpen}
            place={props.isRtl ? 'left' : 'right'}
            onRequestClose={props.onRequestClose}
        >
            <MenuSection>
                {enabledThemes.map(enabledTheme => (
                    <ThemeMenuItem
                        key={enabledTheme}
                        isRtl={props.isRtl}
                        isSelected={props.theme === enabledTheme}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() => props.onChange(enabledTheme)}
                        theme={enabledTheme}
                    />)
                )}
            </MenuSection>
        </MenuBarMenu>
    </div>);
};

ThemeMenu.propTypes = {
    className: PropTypes.string,
    isRtl: PropTypes.bool,
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    theme: PropTypes.string,
    themeMenuOpen: PropTypes.bool
};

export default ThemeMenu;
