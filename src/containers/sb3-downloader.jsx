import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';


class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
       
        bindAll(this, [
            'downloadProject'
            
        ]);
    }
 

    downloadProject () {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            
            downloadBlob(this?.props?.projectFilename, content, this?.props?.fileId);
        });
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject,
            this.captureScreenshot,
            this.props.isToggled,
            this.props.fileId
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    isToggled : PropTypes.bool,
    fileId: PropTypes.number,
};
SB3Downloader.defaultProps = {
    className: ''
};


const mapDispatchToProps = dispatch => ({
    switchToggle: () => dispatch({type: "SWITCHTOGGLE"})
    
});
const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    isToggled: state.toggleReducer.isToggled,
    fileId: state?.uploadReducer?.items?.id,
});



export default connect(
    mapStateToProps,
    mapDispatchToProps // omit dispatch prop
)(SB3Downloader);
