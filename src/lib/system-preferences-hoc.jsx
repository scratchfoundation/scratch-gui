import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cookie from 'cookie';

import {DEFAULT_THEME} from './themes';
import {setTheme} from '../reducers/theme';

// Dark mode is not yet supported
// const prefersDarkQuery = '(prefers-color-scheme: dark)';
const prefersHighContrastQuery = '(prefers-contrast: more)';

const getTheme = () => {
    if (window.matchMedia(prefersHighContrastQuery).matches) return 'high-contrast';

    return DEFAULT_THEME;
};

const systemPreferencesHOC = function (WrappedComponent) {
    class SystemPreferences extends React.Component {
        componentDidMount () {
            // this.props.onSetTheme(getTheme());
            this.preferencesListener = () => {
                const obj = cookie.parse(document.cookie) || {};
                const themeCookie = obj.scratchtheme;

                // Only use system preferences if there is not a specified cookie.
                if (themeCookie) return;

                this.props.onSetTheme(getTheme());
            }
            this.highContrastMatchMedia = window.matchMedia(prefersHighContrastQuery);
            this.highContrastMatchMedia.addEventListener('change', this.preferencesListener);
        }

        componentWillUnmount () {
            this.highContrastMatchMedia.removeEventListener('change', this.preferencesListener);
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                onSetTheme,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return <WrappedComponent {...props} />;
        }
    }

    SystemPreferences.propTypes = {
        onSetTheme: PropTypes.func
    };

    const mapDispatchToProps = dispatch => ({
        onSetTheme: theme => dispatch(setTheme(theme))
    });

    return connect(
        null,
        mapDispatchToProps
    )(SystemPreferences);
};

export default systemPreferencesHOC;
