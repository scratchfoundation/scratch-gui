import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import storage from '../lib/storage';
import {projectTitleInitialState} from '../reducers/project-title';


/**
 * Project saver component passes a saveProject function to its child.
 * It expects this child to be a function with the signature
 *     function (saveProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <ProjectSaver>{(saveProject, props) => (
 *     <MyCoolComponent
 *         onClick={saveProject}
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
            'saveProject',
            'doStoreProject'
        ]);
    }
    saveProject () {
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.saveProjectSb3().then(content => {
            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, this.props.projectFilename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            saveLink.href = url;
            saveLink.download = this.props.projectFilename;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    doStoreProject (id) {
        return this.props.saveProjectSb3()
            .then(content => {
                const assetType = storage.AssetType.Project;
                const dataFormat = storage.DataFormat.SB3;
                const body = new FormData();
                body.append('sb3_file', content, 'sb3_file');
                return storage.store(
                    assetType,
                    dataFormat,
                    body,
                    id
                );
            });
    }
    createProject () {
        return this.doStoreProject();
    }
    updateProject () {
        return this.doStoreProject(this.props.projectId);
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.saveProject,
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
    projectFilename: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    saveProjectSb3: PropTypes.func
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    projectId: state.scratchGui.projectId
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ProjectSaver);
