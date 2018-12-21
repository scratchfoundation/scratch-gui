import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import {connect} from 'react-redux';
import {setFontsLoaded} from '../reducers/fonts-loaded';

/* Higher Order Component to provide behavior for loading fonts.
 * @param {React.Component} WrappedComponent component to receive fontsLoaded prop
 * @returns {React.Component} component with font loading behavior
 */
const FontLoaderHOC = function (WrappedComponent) {
    class FontLoaderComponent extends React.Component {
        componentDidMount () {
            if (this.props.fontsLoaded) return;

            const getFontPromises = () => {
                const fontPromises = [];
                // Browsers that support the font loader interface have an iterable document.fonts.values()
                // Firefox has a mocked out object that doesn't actually implement iterable, which is why
                // the deep safety check is necessary.
                if (document.fonts &&
                    typeof document.fonts.values === 'function' &&
                    typeof document.fonts.values()[Symbol.iterator] === 'function') {
                    for (const fontFace of document.fonts.values()) {
                        fontPromises.push(fontFace.loaded);
                        fontFace.load();
                    }
                }
                return fontPromises;
            };
            // Font promises must be gathered after the document is loaded, because on Mac Chrome, the promise
            // objects get replaced and the old ones never resolve.
            if (document.readyState === 'complete') {
                Promise.all(getFontPromises()).then(() => {
                    this.props.onSetFontsLoaded();
                });
            } else {
                document.onreadystatechange = () => {
                    if (document.readyState !== 'complete') return;
                    document.onreadystatechange = null;
                    Promise.all(getFontPromises()).then(() => {
                        this.props.onSetFontsLoaded();
                    });
                };
            }
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
