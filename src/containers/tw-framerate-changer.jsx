import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

const messages = defineMessages({
    newFramerate: {
        defaultMessage: 'New framerate:',
        description: 'Prompt shown to choose a new framerate',
        id: 'tw.menuBar.newFramerate'
    }
});

class FramerateChanger extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'changeFramerate'
        ]);
    }
    changeFramerate (e) {
        if (e && (e.ctrlKey || e.shiftKey)) {
            // eslint-disable-next-line no-alert
            const newFPS = prompt(this.props.intl.formatMessage(messages.newFramerate), this.props.framerate);
            if (newFPS === null) {
                return;
            }
            const fps = +newFPS;
            if (isFinite(fps) && fps > 0) {
                this.props.vm.setFramerate(fps);
            }
        } else if (this.props.framerate === 60) {
            this.props.vm.setFramerate(30);
        } else {
            this.props.vm.setFramerate(60);
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            intl,
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.changeFramerate, props);
    }
}

FramerateChanger.propTypes = {
    intl: intlShape,
    children: PropTypes.func,
    framerate: PropTypes.number,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    framerate: state.scratchGui.tw.framerate,
    vm: state.scratchGui.vm
});

export default injectIntl(connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(FramerateChanger));
