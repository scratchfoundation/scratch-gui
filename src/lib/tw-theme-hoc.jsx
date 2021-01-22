import React from 'react';

const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const ThemeHOC = function (WrappedComponent) {
    class ThemeComponent extends React.Component {
        constructor (props) {
            super(props);
            this.handleQueryChange = this.handleQueryChange.bind(this);
            const urlParams = new URLSearchParams(location.search);
            this.state = {
                dark: urlParams.has('theme') ? urlParams.get('theme') === 'dark' : darkMediaQuery.matches
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
    return ThemeComponent;
};

export {
    ThemeHOC as default
};
