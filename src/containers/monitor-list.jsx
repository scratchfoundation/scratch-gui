import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';

import {connect} from 'react-redux';
import {moveMonitorRect} from '../reducers/monitor-layout';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import OpcodeLabels from '../lib/opcode-labels';

import MonitorListComponent from '../components/monitor-list/monitor-list.jsx';

class MonitorList extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMonitorChange'
        ]);
        OpcodeLabels.setTranslatorFunction(props.intl.formatMessage);
    }
    handleMonitorChange (id, x, y) { // eslint-disable-line no-unused-vars
        this.props.moveMonitorRect(id, x, y);
    }
    render () {
        return (
            <MonitorListComponent
                onMonitorChange={this.handleMonitorChange}
                {...this.props}
            />
        );
    }
}

MonitorList.propTypes = {
    intl: intlShape.isRequired,
    moveMonitorRect: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    monitors: state.scratchGui.monitors
});
const mapDispatchToProps = dispatch => ({
    moveMonitorRect: (id, x, y) => dispatch(moveMonitorRect(id, x, y))
});

export default errorBoundaryHOC('Monitors')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(MonitorList))
);
