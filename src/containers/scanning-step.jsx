import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleSearch'
        ]);
        this.state = {
            searching: true,
            devices: []
        };
    }
    handleCancel () {
        this.props.onCancel();
    }
    handleSearch () {
        this.props.onSearch();
    }
    render () {
        return (
            <ScanningStepComponent
                title={this.props.id}
                onCancel={this.handleCancel}
                onSearch={this.handleSearch}
                phase={this.state.phase}
            />
        );
    }
}

ScanningStep.propTypes = {
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default ScanningStep;
