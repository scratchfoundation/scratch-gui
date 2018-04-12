import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class SaveButton extends React.Component {
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
            const url = window.URL.createObjectURL(content);

            saveLink.href = url;

            // TODO user-friendly project name
            // File name: project-DATE-TIME
            const date = new Date();
            const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            saveLink.download = `untitled-project-${timestamp}.sb3`;
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

SaveButton.propTypes = {
    children: PropTypes.func,
    vm: PropTypes.shape({
        saveProjectSb3: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveButton);
