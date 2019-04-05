import {connect} from 'react-redux';
import {
    compose,
    fetching,
    idleRequireWhileLoading
} from '../../lib/dynamic-render';

const idleWithRendererAfterFetching = connect(state => ({
    priority: (!fetching(state) && !state.scratchGui.vm.renderer) ? -1 : null
}));

export default compose(
    idleWithRendererAfterFetching,
    idleRequireWhileLoading
)(() => require('./stage.jsx'));
