import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import {setCloud} from '../reducers/tw';

const messages = defineMessages({
    cloudUnavailableAlert: {
        defaultMessage: 'Cannot use cloud variables, most likely because you opened the editor.',
        description: 'Message displayed when clicking on the option to toggle cloud variables when cloud variables are not available',
        id: 'tw.menuBar.cloudUnavailableAlert'
    }
});

class CloudVariablesToggler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCloudVariables'
        ]);
    }
    toggleCloudVariables () {
        if (!this.props.canUseCloudVariables) {
            // eslint-disable-next-line no-alert
            alert(this.props.intl.formatMessage(messages.cloudUnavailableAlert));
            return;
        }
        this.props.onCloudChange(!this.props.enabled);
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleCloudVariables, props);
    }
}

CloudVariablesToggler.propTypes = {
    intl: intlShape,
    children: PropTypes.func,
    enabled: PropTypes.bool,
    username: PropTypes.string,
    onCloudChange: PropTypes.func,
    canUseCloudVariables: PropTypes.bool
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username,
    enabled: state.scratchGui.tw.cloud,
    canUseCloudVariables: !state.scratchGui.mode.hasEverEnteredEditor
});

const mapDispatchToProps = dispatch => ({
    onCloudChange: enabled => dispatch(setCloud(enabled))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CloudVariablesToggler));
