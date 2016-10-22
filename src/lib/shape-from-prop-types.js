const React = require('react');

module.exports = function shapeFromPropTypes (propTypes, opts) {
    opts = Object.assign({}, opts, {omit: []});
    const shape = Object
        .keys(propTypes)
        .filter(key => opts.omit.indexOf(key) !== -1)
        .reduce((newPropTypes, key) => {
            newPropTypes[key] = propTypes[key];
            return newPropTypes;
        }, {});
    return React.PropTypes.shape(shape);
};
