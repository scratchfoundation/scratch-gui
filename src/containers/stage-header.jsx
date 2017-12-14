import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {setZoomed} from '../reducers/zoom';

import {connect} from 'react-redux';

import StageHeaderComponent from '../components/stage-header/stage-header.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class StageHeader extends React.Component {
    render () {
        const {
            ...props
        } = this.props;
        return (
            <StageHeaderComponent
                {...props}
            />
        );
    }
}

StageHeader.propTypes = {
    height: PropTypes.number,
    isZoomed: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired,
    width: PropTypes.number
};

const mapStateToProps = state => ({
    isZoomed: state.isZoomed
});

const mapDispatchToProps = dispatch => ({
    onZoom: () => dispatch(setZoomed(true)),
    onUnzoom: () => dispatch(setZoomed(false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StageHeader);
