import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';
/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */


class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject', 'downloadProjectOld'
        ]);
    }
    downloadProject() {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            downloadBlob(this.props.projectFilename, content);
        });
    }
    downloadProjectOld() {
        this.props.saveProjectSb3Old().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            downloadBlob(this.props.projectFilenameOld, content);
        });
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject,
            this.downloadProjectOld
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle, regularScratch = false) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    if (regularScratch) {
        return `${filenameTitle.substring(0, 100)}.sb3`;
    }
    return `${filenameTitle.substring(0, 100)}.sbpp`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    projectFilenameOld: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    saveProjectSb3Old: PropTypes.func
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSbpp.bind(state.scratchGui.vm),
    saveProjectSb3Old: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
    projectFilenameOld: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState, true)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3Downloader);
