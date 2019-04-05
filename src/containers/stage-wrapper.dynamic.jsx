import {connect} from 'react-redux';
import {compose, fetching, idleRequireWhileLoading, loading} from '../lib/dynamic-render';

const idleWithRendererAfterFetching = connect(state => ({
    priority: ((
        (!fetching(state) && !state.scratchGui.vm.renderer) ||
        !loading(state)
    ) ? -1 : null)
}));

export default compose(
    idleWithRendererAfterFetching,
    idleRequireWhileLoading
)(() => require('./stage-wrapper.jsx'));
