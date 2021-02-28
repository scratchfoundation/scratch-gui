import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import {connect} from 'react-redux';
import {setFontsLoaded} from '../reducers/fonts-loaded';
import {loadFonts} from 'scratch-render-fonts';

/* Higher Order Component to provide behavior for loading fonts.
 * @param {React.Component} WrappedComponent component to receive fontsLoaded prop
 * @returns {React.Component} component with font loading behavior
 */
const FontLoaderHOC = function (WrappedComponent) {
    class FontLoaderComponent extends React.Component {
        componentDidMount () {
            if (this.props.fontsLoaded) return;

            loadFonts().then(() => this.props.onSetFontsLoaded());
        }
        render () {
            const componentProps = omit(this.props, ['onSetFontsLoaded']);
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }


    FontLoaderComponent.propTypes = {
        fontsLoaded: PropTypes.bool.isRequired,
        onSetFontsLoaded: PropTypes.func.isRequired
    };
    const mapStateToProps = state => ({
        fontsLoaded: state.scratchGui.fontsLoaded
    });
    const mapDispatchToProps = dispatch => ({
        onSetFontsLoaded: () => dispatch(setFontsLoaded())
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(FontLoaderComponent);
};

export {
    FontLoaderHOC as default
};
