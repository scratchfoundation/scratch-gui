import React from 'react';

const {createElement, collapseElement} = (function () {
    if (process.env.NODE_ENV === 'production') {
        return {
            createElement (Type, props) {
                return {
                    __delayElement: true,
                    Type,
                    props
                };
            },
            collapseElement (element) {
                return element && element.__delayElement ?
                    element.Type.prototype instanceof React.Component ?
                        <element.Type {...element.props} /> :
                        element.Type(element.props) :
                    element;
            }
        };
    }

    return {
        createElement (Type, props) {
            return <Type {...props} />;
        },
        collapseElement (element) {
            return element;
        }
    };
}());

const flattenStatelessElement = (Type, props) => (
    collapseElement(createElement(Type, props))
);

export {
    collapseElement,
    createElement,
    flattenStatelessElement
};
