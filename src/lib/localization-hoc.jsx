import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ConnectedIntlProvider from './connected-intl-provider.jsx';

/*
 * Higher Order Component to provide localiztion state. Creates a nested IntlProvider
 * to handle Gui intl context. The component accepts an onSetLanguage callback that is
 * called when the locale chagnes.
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with intl state provided from redux
 */
const LocalizationHOC = function (WrappedComponent) {
    class LocalizationWrapper extends React.Component {
        componentDidUpdate (prevProps) {
            if (prevProps.locale !== this.props.locale) {
                this.props.onSetLanguage(this.props.locale);
            }
        }
        render () {
            const {
                locale, // eslint-disable-line no-unused-vars
                onSetLanguage, // eslint-disable-line no-unused-vars
                ...componentProps
            } = this.props;
            return (
                <ConnectedIntlProvider>
                    <WrappedComponent {...componentProps} />
                </ConnectedIntlProvider>
            );
        }
    }
    LocalizationWrapper.propTypes = {
        locale: PropTypes.string,
        onSetLanguage: PropTypes.func
    };

    LocalizationWrapper.defaultProps = {
        onSetLanguage: () => {}
    };

    const mapStateToProps = state => ({
        locale: state.locales.locale
    });

    const mapDispatchToProps = () => ({});

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(LocalizationWrapper);
};

export default LocalizationHOC;
