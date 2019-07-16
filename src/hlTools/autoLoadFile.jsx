import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { injectIntl} from 'react-intl';
import {getAB} from '../hlTools/HLAxios.js';
import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';
import {LoadingStates, onLoadedProject} from '../reducers/project-state';


class autoLoadFile extends Component {
    componentDidMount () {

        // setTimeout(this.loading.bind(this),1500);

    }

    loading () {
        this.props.onLoadingStarted();
        getAB('uploads/lqyx.sb3')
            .then((res) => {
                console.log(res);

                const filename = 'xx.sb3';
                this.props.vm.loadProject(res.data)
                    .then(() => {
                        console.log('55555555555555555');
                        this.props.onLoadingFinished(this.props.loadingState, true);
                        // // Reset the file input after project is loaded
                        // // This is necessary in case the user wants to reload a project
                        if (filename) {
                            const uploadedProjectTitle = this.getProjectTitleFromFilename(filename);
                            this.props.onUpdateProjectTitle(uploadedProjectTitle);
                        }
                    })
                    .catch(error => {
                        // log.warn(error);
                        this.props.onLoadingFinished(this.props.loadingState, true);
                    });
            });
    }

    render () {
        return (
            <div>
            </div>
        );
    }
}

autoLoadFile.propTypes = {
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    }),
    onLoadingFinished: PropTypes.func,
    onLoadingStarted: PropTypes.func,
    loadingState: PropTypes.oneOf(LoadingStates),
    onUpdateProjectTitle: PropTypes.func,
};
const mapStateToProps = state => {
    const loadingState = state.scratchGui.projectState.loadingState;
    return {
        projectChanged: state.scratchGui.projectChanged,
        vm: state.scratchGui.vm,
        loadingState: loadingState
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoadingStarted: () => dispatch(openLoadingProject()),
    onLoadingFinished: (loadingState, success) => {
        dispatch(onLoadedProject(loadingState,success));
        dispatch(closeLoadingProject());
    }
});

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
    {}, stateProps, dispatchProps, ownProps
);
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(injectIntl(autoLoadFile));
