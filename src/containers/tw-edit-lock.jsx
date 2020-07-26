import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import EditorLockComponent from '../components/tw-edit-lock/tw-edit-lock.jsx';

class EditorLock extends React.Component {
    constructor (props) {
        super(props);
    }
    isLocked () {
        return this.props.cloud;
    }
    render () {
        return this.isLocked() ? <EditorLockComponent /> : null;
    }
}

EditorLock.propTypes = {
    cloud: PropTypes.bool,
};

const mapStateToProps = state => ({
    cloud: state.scratchGui.tw ? state.scratchGui.tw.cloud : false,
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(EditorLock);
