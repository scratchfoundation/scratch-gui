import PropTypes from 'prop-types';
import React from 'react';

import {ImportErrorTooltip} from '../import-error/import-error.jsx';


// TODO error tooltip needs to go around both the input and the button
// error tooltip should also be always visible
class ImportInput extends React.Component {
    render () {
        let input = null;
        if (this.props.hasValidationError) {
            input = (
                <ImportErrorTooltip
                    className={this.props.errorDivClassName}
                    errorMessage={this.props.errorMessage}
                    place="bottom"
                    tooltipId="import-input-error"
                >
                    <input
                        autoFocus
                        className={this.props.badClassName}
                        placeholder={this.props.placeholder}
                        value={this.props.inputValue}
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                    />
                </ImportErrorTooltip>
            );
        } else {
            input = (
                <input
                    autoFocus
                    className={this.props.okClassName}
                    placeholder={this.props.placeholder}
                    value={this.props.inputValue}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress}
                />
            );
        }
        return input;
    }
}

ImportInput.propTypes = {
    badClassName: PropTypes.string,
    errorDivClassName: PropTypes.string,
    errorMessage: PropTypes.string.isRequired,
    hasValidationError: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    okClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default ImportInput;
