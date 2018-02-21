import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import {ImportErrorTooltip} from '../import-error/import-error.jsx';


class ImportInput extends React.Component {
    render () {
        let input = null;
        if (!this.props.hasValidationError) {
            input = (
                    <input
                        autoFocus
                        className={this.props.okClassName}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        value={this.props.inputValue}
                    />
            );
        } else {
            input = (
                <ImportErrorTooltip
                   place="bottom"
                   tooltipId="import-input-error"
                   errorMessage={this.props.errorMessage}
                   className={this.props.errorDivClassName}
                >
                    <input
                        autoFocus
                        className={this.props.badClassName}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        value={this.props.inputValue}
                    />
                </ImportErrorTooltip>
            );
        }
        return input;
    }
}

ImportInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string.isRequired,
    hasValidationError: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    okClassName: PropTypes.string,
    badClassName: PropTypes.string,
    errorDivClassName: PropTypes.string
};

export default ImportInput;
