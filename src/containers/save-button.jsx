import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import JSZip from 'jszip';

import ButtonComponent from '../components/button/button.jsx';
import {ComingSoonTooltip} from '../components/coming-soon/coming-soon.jsx';


class SaveButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick () {
        const zip = new JSZip();
        // Get the serialized project and assets from vm
        const projectInfo = this.props.saveProjectSb3();

        const json = projectInfo.projectJson;
        const sounds = projectInfo.sounds;
        const costumes = projectInfo.costumes;

        // Put everything in a zip file
        zip.file('project.json', json);
        for (let i = 0; i < sounds.length; i++) {
            const currSound = sounds[i];
            zip.file(currSound.fileName, currSound.fileContent);
        }
        for (let i = 0; i < costumes.length; i++) {
            const currCostume = costumes[i];
            zip.file(currCostume.fileName, currCostume.fileContent);
        }

        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        zip.generateAsync({type: 'blob'}).then(content => {
            const url = window.URL.createObjectURL(content);

            saveLink.href = url;

            // TODO Project name/location should be chosen by user
            // File name: project-DATE-TIME
            const date = new Date();
            const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            saveLink.download = `project-${timestamp}.zip`;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    render () {
        const {
            saveProjectSb3, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <ComingSoonTooltip
                place="bottom"
                tooltipId="save-button"
            >
                <ButtonComponent
                    disabled
                    onClick={this.handleClick}
                    {...props}
                >
                    Save
                </ButtonComponent>
            </ComingSoonTooltip>
        );
    }
}

SaveButton.propTypes = {
    saveProjectSb3: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveButton);
