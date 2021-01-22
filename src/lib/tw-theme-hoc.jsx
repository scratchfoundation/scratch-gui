import React from 'react';

const THEME_KEY = 'tw:theme';

const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const getInitialDarkMode = () => {
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
            try {
                localStorage.setItem(THEME_KEY, this.state.dark ? 'dark' : 'light');
            } catch (e) {
                // ignore
            }
            document.body.style.backgroundColor = this.state.dark ? '#111' : 'white';
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
                <div theme={this.state.dark ? 'dark' : 'light'}>
                    <WrappedComponent
                        onClickTheme={this.handleClickTheme}
                        {...this.props}
                    />
                </div>
            );
        }
    }
    return ThemeComponent;
};

export {
    ThemeHOC as default
};
