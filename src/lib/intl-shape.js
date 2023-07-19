import PropTypes from 'prop-types';

// intlShape was removed in react-intl@3 and replaced with a TypeScript interface.
// These are some of the commonly used properties from the intl object.
const intlShape = PropTypes.shape({
    locale: PropTypes.string.isRequired,
    formatMessage: PropTypes.func.isRequired
});

export default intlShape;
