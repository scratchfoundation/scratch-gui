import React from 'react';
import darkModeCSS from '!raw-loader!./tw-theme-dark.css';

const THEME_KEY = 'tw:theme';

const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export const getInitialDarkMode = () => {
    try {
        const item = localStorage.getItem(THEME_KEY);
        if (item !== null) {
            return item === 'dark';
        }
    } catch (e) {
        // ignore
    }
    return darkMediaQuery.matches;
};

const darkModeStylesheet = document.createElement('style');
darkModeStylesheet.textContent = darkModeCSS;

const ThemeHOC = function (WrappedComponent) {
    class ThemeComponent extends React.Component {
        constructor (props) {
            super(props);
            this.handleQueryChange = this.handleQueryChange.bind(this);
            this.handleClickTheme = this.handleClickTheme.bind(this);
            this.state = {
                dark: getInitialDarkMode()
            };
        }
        componentDidMount () {
            // media query does not have listeners in legacy edge
            if (darkMediaQuery.addEventListener) {
                darkMediaQuery.addEventListener('change', this.handleQueryChange);
            }
            this.updateDark();
        }
        componentDidUpdate () {
            try {
                localStorage.setItem(THEME_KEY, this.state.dark ? 'dark' : 'light');
            } catch (e) {
                // ignore
            }
            this.updateDark();
        }
        componentWillUnmount () {
            // media query does not have listeners in legacy edge
            if (darkMediaQuery.removeEventListener) {
                darkMediaQuery.removeEventListener('change', this.handleQueryChange);
            }
        }
        updateDark () {
            const dark = this.state.dark;
            document.body.setAttribute('theme', dark ? 'dark' : 'light');
            if (dark && !darkModeStylesheet.parentNode) {
                document.body.insertBefore(darkModeStylesheet, document.body.firstChild);
            } else if (!dark && darkModeStylesheet.parentNode) {
                darkModeStylesheet.parentNode.removeChild(darkModeStylesheet);
            }
        }
        handleQueryChange () {
            this.setState({
                dark: darkMediaQuery.matches
            });
        }
        handleClickTheme () {
            this.setState(state => ({
                dark: !state.dark
            }));
        }
        render () {
            return (
                <WrappedComponent
                    onClickTheme={this.handleClickTheme}
                    {...this.props}
                />
            );
        }
    }
    return ThemeComponent;
};

export {
    ThemeHOC as default
};
