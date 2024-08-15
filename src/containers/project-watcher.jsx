import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    getIsShowingWithId
} from '../reducers/project-state';

/**
 * Watches for project to finish updating before taking some action.
 *
 * To use ProjectWatcher, pass it a callback function using the onDoneUpdating prop.
 * ProjectWatcher passes a waitForUpdate function to its children, which they can call
 * to set ProjectWatcher to request that it call the onDoneUpdating callback when
 * project is no longer updating.
 */
class ProjectWatcher extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'waitForUpdate'
        ]);

        this.state = {
            waiting: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.state.waiting && this.props.isShowingWithId && !prevProps.isShowingWithId) {
            this.fulfill();
        }
    }
    fulfill () {
        this.props.onDoneUpdating();
        this.setState({ // eslint-disable-line react/no-did-update-set-state
            waiting: false
        });
    }
    waitForUpdate (isUpdating) {
        if (isUpdating) {
            this.setState({
                waiting: true
            });
        } else { // fulfill immediately
            this.fulfill();
        }
    }
    render () {
        return this.props.children(
            this.waitForUpdate
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
