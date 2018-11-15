import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    getIsShowingWithId
} from '../reducers/project-state';

class ProjectWatcher extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'waitForSaving'
        ]);

        this.state = {
            waiting: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.state.waiting && this.props.isShowingWithId && !prevProps.isShowingWithId) {
            this.fulfillRequest();
        }
    }
    fulfillRequest () {
        this.props.onDoneUpdating();
        this.setState({ // eslint-disable-line react/no-did-update-set-state
            waiting: false
        });
    }
    waitForSaving (isSaving) {
        if (isSaving) {
            this.setState({
                waiting: true
            });
        } else { // fulfill immediately
            this.fulfillRequest();
        }
    }
    render () {
        return this.props.children(
            this.waitForSaving
        );
    }
}

ProjectWatcher.propTypes = {
    children: PropTypes.func,
    isShowingWithId: PropTypes.bool,
    onDoneUpdating: PropTypes.func
};

ProjectWatcher.defaultProps = {
    onDoneUpdating: () => {}
};

const mapStateToProps = state => {
    const loadingState = state.scratchGui.projectState.loadingState;
    return {
        isShowingWithId: getIsShowingWithId(loadingState)
    };
};

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectWatcher);
