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
            'setRequesting'
        ]);

        this.state = {
            requesting: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.state.requesting && this.props.isShowingWithId && !prevProps.isShowingWithId) {
            this.fulfillRequest();
        }
    }
    fulfillRequest () {
        this.props.onShowingWithId();
        this.setState({ // eslint-disable-line react/no-did-update-set-state
            requesting: false
        });
    }
    setRequesting (waitForRequest) {
        if (waitForRequest) {
            this.setState({
                requesting: true
            });
        } else { // fulfill immediately
            this.fulfillRequest();
        }
    }
    render () {
        return this.props.children(
            this.setRequesting
        );
    }
}

ProjectWatcher.propTypes = {
    children: PropTypes.func,
    isShowingWithId: PropTypes.bool,
    onShowingWithId: PropTypes.func
};

ProjectWatcher.defaultProps = {
    onShowingWithId: () => {}
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
