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
            darkMediaQuery.addEventListener('change', this.handleQueryChange);
        }
        componentDidUpdate () {
            const dark = this.state.dark;
            try {
                localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
            } catch (e) {
                // ignore
            }
            document.body.setAttribute('theme', dark ? 'dark' : 'light');
            if (dark && !darkModeStylesheet.parentNode) {
                document.head.appendChild(darkModeStylesheet);
            } else if (!dark && darkModeStylesheet.parentNode) {
                darkModeStylesheet.parentNode.removeChild(darkModeStylesheet);
            }
        }
        componentWillUnmount () {
            darkMediaQuery.removeEventListener('change', this.handleQueryChange);
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
