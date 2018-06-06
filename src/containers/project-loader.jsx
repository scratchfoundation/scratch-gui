import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import analytics from '../lib/analytics';

import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';

/**
 * Project loader component passes a file input, load handler and props to its child.
 * It expects this child to be a function with the signature
 *     function (renderFileInput, loadProject, props) {}
 * The component can then be used to attach project loading functionality
 * to any other component:
 *
 * <ProjectLoader>{(renderFileInput, loadProject, props) => (
 *     <MyCoolComponent
 *         onClick={loadProject}
 *         {...props}
 *     >
 *         {renderFileInput()}
 *     </MyCoolComponent>
 * )}</ProjectLoader>
 */
class ProjectLoader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'renderFileInput',
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
        this.state = {
            loadingError: false,
            errorMessage: ''
        };
    }
    handleChange (e) {
        // Remove the hash if any (without triggering a hash change event or a reload)
        history.replaceState({}, document.title, '.');
        const reader = new FileReader();
        const thisFileInput = e.target;
        reader.onload = () => this.props.vm.loadProject(reader.result)
            .then(() => {
                analytics.event({
                    category: 'project',
                    action: 'Import Project File',
                    nonInteraction: true
                });
                this.props.closeLoadingState();
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
            })
            .catch(error => {
                this.setState({loadingError: true, errorMessage: error});
            });
        if (thisFileInput.files) { // Don't attempt to load if no file was selected
            this.props.openLoadingState();
            reader.readAsArrayBuffer(thisFileInput.files[0]);
        }
    }
    handleClick () {
        this.fileInput.click();
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    renderFileInput () {
        return (
            <input
                accept=".sb2,.sb3"
                ref={this.setFileInput}
                style={{display: 'none'}}
                type="file"
                onChange={this.handleChange}
            />
        );
    }
    render () {
        if (this.state.loadingError) {
            throw new Error(
                `Failed to load project from file: ${this.state.errorMessage}`);
        }
        const {
            /* eslint-disable no-unused-vars */
            children,
            closeLoadingState,
            openLoadingState,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.renderFileInput, this.handleClick, props);
    }
}

ProjectLoader.propTypes = {
    children: PropTypes.func,
    closeLoadingState: PropTypes.func,
    openLoadingState: PropTypes.func,
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    closeLoadingState: () => dispatch(closeLoadingProject()),
    openLoadingState: () => dispatch(openLoadingProject())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectLoader);
