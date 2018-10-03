import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
// import storage from '../lib/storage';
import {projectTitleInitialState} from '../reducers/project-title';
import {ProjectState} from '../reducers/project-id';
// import {doStoreProject} from '../reducers/vm';


/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <ProjectSaver>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</ProjectSaver>
 */
class ProjectSaver extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'createProject',
            'updateProject',
            'downloadProject'
        ]);
    }
    downloadProject () {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, this.props.projectFilename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            downloadLink.href = url;
            downloadLink.download = this.props.projectFilename;
            downloadLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
        });
    }
    // doStoreProject (id) {
    //     return this.props.saveProjectSb3()
    //         .then(content => {
    //             if (this.props.onSaveFinished) {
    //                 this.props.onSaveFinished();
    //             }
    //             const assetType = storage.AssetType.Project;
    //             const dataFormat = storage.DataFormat.SB3;
    //             const body = new FormData();
    //             body.append('sb3_file', content, 'sb3_file');
    //             return storage.store(
    //                 assetType,
    //                 dataFormat,
    //                 body,
    //                 id
    //             );
    //         });
    // }
    // NOTE: remove these
    createProject () {
        if (this.props.isShowingWithId) {
            return this.props.doStoreProject(null, this.props.onSaveFinished);
        }
        return Promise.reject();
    }
    updateProject () {
        if (this.props.isShowingWithId) {
            return this.props.doStoreProject(this.props.projectId, this.props.onSaveFinished);
        }
        return Promise.reject();
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.downloadProject,
            this.updateProject,
            this.createProject
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

ProjectSaver.propTypes = {
    children: PropTypes.func,
    doStoreProject: PropTypes.func,
    isShowingWithId: PropTypes.bool,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    saveProjectSb3: PropTypes.func
};

const mapStateToProps = state => {
    const projectState = state.scratchGui.projectId.projectState;
    return {
        isShowingWithId: projectState === ProjectState.SHOWING_WITH_ID,
        saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
        projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
        projectId: state.scratchGui.projectId.projectId
    };
};

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ProjectSaver);
