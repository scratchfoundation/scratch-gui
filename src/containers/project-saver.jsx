import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

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
            'saveProject'
        ]);
    }
    saveProject () {
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.saveProjectSb3().then(content => {
            // TODO user-friendly project name
            // File name: project-DATE-TIME
            const date = new Date();
            const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            const filename = `untitled-project-${timestamp}.sb3`;

            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, filename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            saveLink.href = url;
            saveLink.download = filename;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.saveProject, props);
    }
}

ProjectSaver.propTypes = {
    children: PropTypes.func,
    vm: PropTypes.shape({
        saveProjectSb3: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ProjectSaver);
