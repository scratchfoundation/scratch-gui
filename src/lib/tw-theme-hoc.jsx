import React from 'react';

const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const ThemeHOC = function (WrappedComponent) {
    class ThemeComponent extends React.Component {
        constructor (props) {
            super(props);
            this.handleQueryChange = this.handleQueryChange.bind(this);
            this.handleClickTheme = this.handleClickTheme.bind(this);
            this.state = {
                dark: darkMediaQuery.matches
            };
        }
        componentDidMount () {
            darkMediaQuery.addEventListener('change', this.handleQueryChange);
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
