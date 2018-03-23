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

        this.props.vm.saveProjectSb3().then(content => {
            const url = window.URL.createObjectURL(content);

            saveLink.href = url;

            // TODO user-friendly project name
            // File name: project-DATE-TIME
            const date = new Date();
            const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            // TODO change extension to sb3
            saveLink.download = `untitled-project-${timestamp}.sb3`;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
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
