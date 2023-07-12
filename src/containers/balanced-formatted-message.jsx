import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import BalancedText from './balanced-text.jsx';

const BalancedFormattedMessage = props => {
    const {className, resize, style, ...otherProps} = props;
    const balancedTextProps = {className, resize, style};
    return (<FormattedMessage {...otherProps}>
        {(...children) => <BalancedText {...balancedTextProps}>{children}</BalancedText>}
    </FormattedMessage>);
};

BalancedFormattedMessage.propTypes = {
    ...FormattedMessage.propTypes,
    resize: PropTypes.bool
};

export default BalancedFormattedMessage;
