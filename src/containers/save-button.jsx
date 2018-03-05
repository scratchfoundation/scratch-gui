import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

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
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.saveProjectSb3().then(content => {
            const url = window.URL.createObjectURL(content);

            saveLink.href = url;

            // TODO user-friendly project name
            // File name: project-DATE-TIME
            const date = new Date();
            const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            // TODO change extension to sb3
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
