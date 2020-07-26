import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setCloud} from '../reducers/tw';

class CloudVariablesToggler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCloudVariables'
        ]);
    }
    toggleCloudVariables () {
        if (!this.props.username || this.props.username.length < 3) {
            // temporary
            alert('Username is missing or too short.');
            return;
        }
        this.props.onCloudChange(!this.props.cloud);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleCloudVariables, props);
    }
}

CloudVariablesToggler.propTypes = {
    children: PropTypes.func,
    cloud: PropTypes.bool,
    username: PropTypes.string,
    onCloudChange: PropTypes.func
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username,
    cloud: state.scratchGui.tw.cloud
});

const mapDispatchToProps = dispatch => ({
    onCloudChange: cloud => {
        dispatch(setCloud(cloud));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CloudVariablesToggler);
