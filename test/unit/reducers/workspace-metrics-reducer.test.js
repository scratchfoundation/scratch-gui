/* eslint-env jest */
import workspaceMetricsReducer, {updateMetrics} from '../../../src/reducers/workspace-metrics';

test('initialState', () => {
    let defaultState;
    /* workspaceMetricsReducer(state, action) */
    expect(workspaceMetricsReducer(defaultState, {type: 'anything'})).toBeDefined();
    expect(workspaceMetricsReducer(defaultState, {type: 'anything'})).toEqual({targets: {}});
});

test('updateMetrics action creator', () => {
    let defaultState;
    const action = updateMetrics({
        targetID: 'abcde',
        scrollX: 225,
        scrollY: 315,
        scale: 1.25
    });
    const resultState = workspaceMetricsReducer(defaultState, action);
    expect(Object.keys(resultState.targets).length).toBe(1);
    expect(resultState.targets.abcde).toBeDefined();
    expect(resultState.targets.abcde.scrollX).toBe(225);
    expect(resultState.targets.abcde.scrollY).toBe(315);
    expect(resultState.targets.abcde.scale).toBe(1.25);
});
