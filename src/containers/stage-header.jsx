import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import {connect} from 'react-redux';

import StageHeaderComponent from '../components/stage-header/stage-header.jsx';

class StageHeader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleZoom',
            'handleUnzoom'
        ]);
        this.state = {
            isZoomed: false
        };
    }
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.width !== nextProps.width || this.props.height !== nextProps.height || this.state.isZoomed !== nextState.isZoomed;
    }
    handleZoom () {
        this.setState({isZoomed: true});
        this.props.dispatch({type: 'scratch-gui/Zoomed/SET_ZOOMED', isZoomed: true });

    }
    handleUnzoom () {
        this.setState({isZoomed: false});
        this.props.dispatch({type: 'scratch-gui/Zoomed/SET_ZOOMED', isZoomed: false });
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <StageHeaderComponent
                isZoomed={this.state.isZoomed}
                onZoom={this.handleZoom}
                onUnzoom={this.handleUnzoom}
		vm={this.props.vm}
                {...props}
            />
        );
    }
}

StageHeader.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    isZoomed: state.isZoomed
});

export default connect(
    mapStateToProps
)(StageHeader);

