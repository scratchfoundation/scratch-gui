import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

import PreviewComponent from '../components/preview/preview.jsx';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {connect} from 'react-redux';
import { setFullScreen } from '../reducers/mode.js';


const messages = defineMessages({
    previewTitle: {
        defaultMessage: 'Preview',
        description: 'Heading for the Preview Section',
        id: 'gui.sprite.preview'
    }
});


class PreviewWrapper extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose'
        ]);
    }

    handleClose () {
        this.props.onSetStageUnFull()
        this.props.onRequestClose()
    }

    render () {
        return (
            <PreviewComponent
                id="fullScreenPreview"
                title={this.props.intl.formatMessage(messages.previewTitle)}
                onRequestClose={this.handleClose}
                vm={this.props.vm}
            />
        );
    }
}

PreviewWrapper.propTypes = {
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSetStageUnFull: () => dispatch(setFullScreen(false)),
});

export default errorBoundaryHOC('Preview')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(PreviewWrapper))
);
