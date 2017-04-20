const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const stylePropType = require('react-style-proptype');
const styles = require('./box.css');

const getRandomColor = (function () {
    // In "DEBUG" mode this is used to output a random background color for each
    // box. The function gives the same "random" set for each seed, allowing re-
    // renders of the same content to give the same random display.
    const random = (function (seed) {
        let mW = seed;
        let mZ = 987654321;
        const mask = 0xffffffff;
        return function () {
            mZ = ((36969 * (mZ & 65535)) + (mZ >> 16)) & mask;
            mW = ((18000 * (mW & 65535)) + (mW >> 16)) & mask;
            let result = ((mZ << 16) + mW) & mask;
            result /= 4294967296;
            return result + 1;
        };
    }(601));
    return function () {
        const r = Math.max(parseInt(random() * 100, 10) % 256, 1);
        const g = Math.max(parseInt(random() * 100, 10) % 256, 1);
        const b = Math.max(parseInt(random() * 100, 10) % 256, 1);
        return `rgb(${r},${g},${b})`;
    };
}());

const Box = props => {
    const {
        alignContent,
        alignItems,
        alignSelf,
        basis,
        children,
        className,
        componentRef,
        direction,
        element,
        grow,
        height,
        justifyContent,
        width,
        wrap,
        shrink,
        style,
        ...componentProps
    } = props;
    return React.createElement(element, {
        className: classNames(className, styles.box),
        ref: componentRef,
        style: Object.assign(
            {
                alignContent: alignContent,
                alignItems: alignItems,
                alignSelf: alignSelf,
                flexBasis: basis,
                flexDirection: direction,
                flexGrow: grow,
                flexShrink: shrink,
                flexWrap: wrap,
                justifyContent: justifyContent,
                width: width,
                height: height
            },
            process.env.DEBUG ? {
                backgroundColor: getRandomColor(),
                outline: `1px solid black`
            } : {},
            style
        ),
        ...componentProps
    }, children);
};
Box.propTypes = {
    alignContent: PropTypes.oneOf([
        'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'
    ]),
    alignItems: PropTypes.oneOf([
        'flex-start', 'flex-end', 'center', 'baseline', 'stretch'
    ]),
    alignSelf: PropTypes.oneOf([
        'auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'
    ]),
    basis: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['auto'])
    ]),
    children: PropTypes.node,
    className: PropTypes.string,
    componentRef: PropTypes.func,
    direction: PropTypes.oneOf([
        'row', 'row-reverse', 'column', 'column-reverse'
    ]),
    element: PropTypes.string,
    grow: PropTypes.number,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    justifyContent: PropTypes.oneOf([
        'flex-start', 'flex-end', 'center', 'space-between', 'space-around'
    ]),
    shrink: PropTypes.number,
    style: stylePropType,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    wrap: PropTypes.oneOf([
        'nowrap', 'wrap', 'wrap-reverse'
    ])
};
Box.defaultProps = {
    element: 'div',
    style: {}
};
module.exports = Box;
