import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'scratch-vm';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
        this.state = {
            searching: true,
            devices: []
        };
    }
    componentDidMount () {
        this.props.vm.on('peripheral_added', id => {
            // console.log('gui says peripheral added', id);
            this.setState({devices:this.state.devices.concat(id)})
        });
    }
    componentWillUnmount () {
        // remove the listener
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
                phase={this.state.phase}
                title={this.props.id}
                onCancel={this.handleCancel}
            />
        );
    }
}

ScanningStep.propTypes = {
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
