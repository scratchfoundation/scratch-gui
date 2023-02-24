import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DEFAULT_THEME} from './themes';
import {setTheme} from '../reducers/theme';

const prefersDarkQuery = '(prefers-color-scheme: dark)';
const prefersHighContrastQuery = '(prefers-contrast: more)';

const getTheme = () => {
    const highContrast = window.matchMedia(prefersHighContrastQuery).matches;

    if (highContrast) return 'high-contrast';

    const dark = window.matchMedia(prefersDarkQuery).matches;

    if (dark) return 'dark-mode';

    return DEFAULT_THEME;
};

const systemPreferencesHOC = function (WrappedComponent) {
    class SystemPreferences extends React.Component {
        componentDidMount () {
            this.props.onSetTheme(getTheme());
            this.preferencesListener = () => this.props.onSetTheme(getTheme());
            this.highContrastMatchMedia = window.matchMedia(prefersHighContrastQuery);
            this.highContrastMatchMedia.addEventListener('change', this.preferencesListener);
            this.darkMatchMedia = window.matchMedia(prefersDarkQuery);
            this.darkMatchMedia.addEventListener('change', this.preferencesListener);
        }

        componentWillUnmount () {
            this.highContrastMatchMedia.removeEventListener('change', this.preferencesListener);
            this.darkMatchMedia.removeEventListener('change', this.preferencesListener);
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
