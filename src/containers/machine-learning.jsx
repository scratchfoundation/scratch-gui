import React from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import MachineLearningComponent from '../components/machine-learning/machine-learning.jsx';

class MachineLearning extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'
            // 'handleAddBlock'
        ]);
    }

    componentWillUnmount () {
        if (this.workspace) {
            this.workspace.dispose();
        }
    }
    
    handleCancel () {
        this.props.onRequestClose();
    }

    // handleAddBlock () {
    //     this.props.onRequestClose('itsok');
    // }

    render () {
        return (
            <MachineLearningComponent
                isMini={this.props.isMini}
                isHidden={this.props.isHidden}
                onAddBlock={this.props.onRequestClose}
                onCancel={this.handleCancel}
            />
        );
    }
}

MachineLearning.propTypes = {
    isMini: PropTypes.bool,
    isHidden: PropTypes.bool,
    onRequestClose: PropTypes.func
};

export default MachineLearning;
