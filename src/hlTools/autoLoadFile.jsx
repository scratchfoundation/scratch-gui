import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {getAB} from '../hlTools/HLAxios.js';
class autoLoadFile extends Component {
    componentDidMount() {

        // setTimeout(this.loading.bind(this),1500);

    }


    loading() {

        getAB('uploads/20190629/a5976fdfec3b7dda138034feb2689bb7.sb3').then((res)=>{
            console.log(res);
            // this.props.onLoadingStarted();
                // const filename = this.fileToUpload && this.fileToUpload.name;
                this.props.vm.loadProject(res)
                    .then(() => {
                        // this.props.onLoadingFinished(this.props.loadingState, true);
                        // // Reset the file input after project is loaded
                        // // This is necessary in case the user wants to reload a project
                        // if (filename) {
                        //     const uploadedProjectTitle = this.getProjectTitleFromFilename(filename);
                        //     this.props.onUpdateProjectTitle(uploadedProjectTitle);
                        // }
                        // this.resetFileInput();
                    })
                    .catch(error => {
                        log.warn(error);
                        // alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                        // this.props.onLoadingFinished(this.props.loadingState, false);
                        // // Reset the file input after project is loaded
                        // // This is necessary in case the user wants to reload a project
                        // this.resetFileInput();
                    });
        });
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

autoLoadFile.propTypes = {
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};
const mapStateToProps = state => {
    // const loadingState = state.scratchGui.projectState.loadingState;
    return {
        projectChanged: state.scratchGui.projectChanged,
        vm: state.scratchGui.vm
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

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
