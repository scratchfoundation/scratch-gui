import React from 'react';

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const DarkModeHOC = function (WrappedComponent) {
    class DarkModeComponent extends React.Component {
        constructor (props) {
            super(props);
            this.handleQueryChange = this.handleQueryChange.bind(this);
            this.state = {
                dark: mediaQuery.matches
            };
        }
        componentDidMount () {
            mediaQuery.addEventListener('change', this.handleQueryChange);
        }
        componentWillUnmount () {
            mediaQuery.removeEventListener('change', this.handleQueryChange);
        }
        handleQueryChange () {
            this.setState({
                dark: mediaQuery.matches
            });
        }
        render () {
            return (
                <div theme={this.state.dark ? 'dark' : 'light'}>
                    <WrappedComponent
                        {...this.props}
                    />
                </div>
            );
        }
    }
    return DarkModeComponent;
};

export {
    DarkModeHOC as default
};
