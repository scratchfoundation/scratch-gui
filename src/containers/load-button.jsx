import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import JSZip from 'jszip'

import LoadButtonComponent from '../components/load-button/load-button.jsx';

class LoadButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
    }
    handleChange (e) {
        const reader = new FileReader();
        reader.onload = () => {
            this.props.loadProject(reader.result)
        };
        let file = e.target.files[0];
        let fileType = file.name.slice(-4);
        if (fileType == 'json') {
            reader.readAsText(e.target.files[0]);
        }
        if (fileType == '.sb2') {
            var new_zip = new JSZip();
            // more files !
            new_zip.loadAsync(file)
            .then(function(zip) {
                zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                    if (zipEntry.name.slice(-4) == 'json') {
                        zipEntry.async('blob')
                        .then(function (content) { 
                            reader.readAsText(content);
                        });
                    }
                });
            });
        }
        // reader.readAsText(e.target.files[0]);
    }
    handleClick () {
        this.fileInput.click();
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    render () {
        const {
            loadProject, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <LoadButtonComponent
                inputRef={this.setFileInput}
                onChange={this.handleChange}
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

LoadButton.propTypes = {
    loadProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loadProject: state.vm.fromJSON.bind(state.vm)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(LoadButton);
