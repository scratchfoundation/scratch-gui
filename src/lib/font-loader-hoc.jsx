import React from 'react';

/* Higher Order Component to provide behavior for loading fonts.
 * @param {React.Component} WrappedComponent component to receive fontsLoaded prop
 * @returns {React.Component} component with font loading behavior
 */
const FontLoaderHOC = function (WrappedComponent) {
    class FontLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            this.state = {
                fontsLoaded: false
            };
        }
        componentDidMount () {
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
                    this.setState({fontsLoaded: true});
                });
            } else {
                document.onreadystatechange = () => {
                    if (document.readyState !== 'complete') return;
                    document.onreadystatechange = null;
                    Promise.all(getFontPromises()).then(() => {
                        this.setState({fontsLoaded: true});
                    });
                };
            }
        }
        render () {
            return (
                <WrappedComponent
                    fontsLoaded={this.state.fontsLoaded}
                    {...this.props}
                />
            );
        }
    }
    return FontLoaderComponent;
};

export {
    FontLoaderHOC as default
};
