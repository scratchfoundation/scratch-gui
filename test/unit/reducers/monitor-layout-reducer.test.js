/* eslint-env jest */
import monitorLayoutReducer from '../../../src/reducers/monitor-layout';
import {addMonitorRect, moveMonitorRect} from '../../../src/reducers/monitor-layout';
import {resizeMonitorRect, removeMonitorRect} from '../../../src/reducers/monitor-layout';
import {getInitialPosition, PADDING, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../src/reducers/monitor-layout';

test('initialState', () => {
    let defaultState;

    expect(monitorLayoutReducer(defaultState /* state */, {type: 'anything'} /* action */)).toBeDefined();
    expect(monitorLayoutReducer(defaultState /* state */, {type: 'anything'} /* action */).monitors).toBeDefined();
    expect(monitorLayoutReducer(defaultState /* state */, {type: 'anything'} /* action */).savedMonitorPositions)
        .toBeDefined();
});

test('addMonitorRect', () => {
    let defaultState;
    const monitorId = 1;
    const monitorId2 = 2;
    const upperStart = {x: 100, y: 100};
    const lowerEnd = {x: 200, y: 200};

    // Add a monitor rect
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(monitorId, upperStart, lowerEnd));
    expect(reduxState.monitors[monitorId]).toBeDefined();
    expect(reduxState.monitors[monitorId].upperStart).toEqual(upperStart);
    expect(reduxState.monitors[monitorId].lowerEnd).toEqual(lowerEnd);
    // Add monitor rect doesn't save position
    expect(reduxState.savedMonitorPositions[monitorId]).toBeUndefined();
    const reduxState2 = monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 0, 0));

    // Add a second monitor rect
    const reduxState3 = monitorLayoutReducer(reduxState2, addMonitorRect(monitorId2, upperStart, lowerEnd));
    expect(reduxState3.monitors[monitorId]).toBeDefined();
    expect(reduxState3.monitors[monitorId2]).toBeDefined();
    expect(reduxState3.monitors[monitorId2].upperStart).toEqual(upperStart);
    expect(reduxState3.monitors[monitorId2].lowerEnd).toEqual(lowerEnd);
    // Saved positions aren't changed by adding monitor
    expect(reduxState3.savedMonitorPositions).toEqual(reduxState2.savedMonitorPositions);
});

test('addMonitorRectWithSavedPosition', () => {
    let defaultState;
    const monitorId = 1;
    const upperStart = {x: 100, y: 100};
    const lowerEnd = {x: 200, y: 200};

    // Add a monitor rect
    const reduxState = monitorLayoutReducer(defaultState,
        addMonitorRect(monitorId, upperStart, lowerEnd, true /* savePosition */));
    expect(reduxState.monitors[monitorId]).toBeDefined();
    expect(reduxState.monitors[monitorId].upperStart).toEqual(upperStart);
    expect(reduxState.monitors[monitorId].lowerEnd).toEqual(lowerEnd);
    // Save position
    expect(reduxState.savedMonitorPositions[monitorId].x).toEqual(upperStart.x);
    expect(reduxState.savedMonitorPositions[monitorId].y).toEqual(upperStart.y);
});

test('invalidRect', () => {
    let defaultState;
    const reduxState = monitorLayoutReducer(defaultState /* state */, {type: 'initialize'} /* action */);

    // Problem: x end is before x start
    expect(
        monitorLayoutReducer(reduxState,
            addMonitorRect(1, {x: 100, y: 100}, {x: 10, y: 200})))
        .toEqual(reduxState);

    // Problem: y end is before y start
    expect(
        monitorLayoutReducer(reduxState,
            addMonitorRect(1, {x: 100, y: 100}, {x: 200, y: 10})))
        .toEqual(reduxState);
});

test('invalidAddMonitorRect', () => {
    let defaultState;
    const monitorId = 1;
    const upperStart = {x: 100, y: 100};
    const lowerEnd = {x: 200, y: 200};

    // Add a monitor rect
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(monitorId, upperStart, lowerEnd));
    // Try to add the same one
    expect(monitorLayoutReducer(reduxState, addMonitorRect(monitorId, upperStart, lowerEnd)))
        .toEqual(reduxState);
});

test('moveMonitorRect', () => {
    let defaultState;
    const monitorId = 1;
    const monitorId2 = 2;
    const width = 102;
    const height = 101;
    const upperStart = {x: 100, y: 100};
    const lowerEnd = {x: upperStart.x + width, y: upperStart.y + height};
    const movedToPosition = {x: 0, y: 0};
    const movedToPosition2 = {x: 543, y: 2};

    // Add a monitor rect and move it. Expect it to be in monitors state and saved positions.
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(monitorId, upperStart, lowerEnd));
    const reduxState2 = monitorLayoutReducer(reduxState,
        moveMonitorRect(monitorId, movedToPosition.x, movedToPosition.y));
    expect(reduxState2.monitors[monitorId]).toBeDefined();
    expect(reduxState2.monitors[monitorId].upperStart).toEqual(movedToPosition);
    expect(reduxState2.monitors[monitorId].lowerEnd.x).toEqual(movedToPosition.x + width);
    expect(reduxState2.monitors[monitorId].lowerEnd.y).toEqual(movedToPosition.y + height);
    expect(reduxState2.savedMonitorPositions[monitorId]).toBeDefined();
    expect(reduxState2.savedMonitorPositions[monitorId].x).toEqual(movedToPosition.x);
    expect(reduxState2.savedMonitorPositions[monitorId].y).toEqual(movedToPosition.y);

    // Add a second monitor rect and move it. Expect there to now be 2 saved positions.
    const reduxState3 = monitorLayoutReducer(reduxState2, addMonitorRect(monitorId2, upperStart, lowerEnd));
    const reduxState4 = monitorLayoutReducer(reduxState3,
        moveMonitorRect(monitorId2, movedToPosition2.x, movedToPosition2.y));
    expect(reduxState4.savedMonitorPositions[monitorId]).toEqual(reduxState2.savedMonitorPositions[monitorId]);
    expect(reduxState4.savedMonitorPositions[monitorId2].x).toEqual(movedToPosition2.x);
    expect(reduxState4.savedMonitorPositions[monitorId2].y).toEqual(movedToPosition2.y);
});

test('invalidMoveMonitorRect', () => {
    let defaultState;
    let reduxState = monitorLayoutReducer(defaultState, {type: 'initialize'} /* action */);
    const monitorId = 1;

    // Try to move a monitor rect that doesn't exist
    expect(monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 1 /* newX */, 1 /* newY */)))
        .toEqual(reduxState);

    // Add the monitor to move
    reduxState = monitorLayoutReducer(reduxState, addMonitorRect(monitorId, {x: 100, y: 100}, {x: 200, y: 200}));

    // Invalid newX
    expect(monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 'Oregon' /* newX */, 1 /* newY */)))
        .toEqual(reduxState);

    // Invalid newY
    expect(monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 1 /* newX */)))
        .toEqual(reduxState);
});

test('resizeMonitorRect', () => {
    let defaultState;
    const monitorId = 1;
    const upperStart = {x: 100, y: 100};
    const newWidth = 10;
    const newHeight = 20;

    // Add a monitor rect and resize it
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(monitorId, upperStart, {x: 200, y: 200}));
    const reduxState2 = monitorLayoutReducer(reduxState,
        resizeMonitorRect(monitorId, newWidth, newHeight));
    expect(reduxState2.monitors[monitorId]).toBeDefined();
    expect(reduxState2.monitors[monitorId].upperStart).toEqual(upperStart);
    expect(reduxState2.monitors[monitorId].lowerEnd.x).toEqual(upperStart.x + newWidth);
    expect(reduxState2.monitors[monitorId].lowerEnd.y).toEqual(upperStart.y + newHeight);
    // Saved positions aren't changed by resizing monitor
    expect(reduxState2.savedMonitorPositions).toEqual(reduxState.savedMonitorPositions);
});

test('invalidResizeMonitorRect', () => {
    let defaultState;
    let reduxState = monitorLayoutReducer(defaultState, {type: 'initialize'} /* action */);
    const monitorId = 1;

    // Try to resize a monitor rect that doesn't exist
    expect(monitorLayoutReducer(reduxState, resizeMonitorRect(monitorId, 1 /* newWidth */, 1 /* newHeight */)))
        .toEqual(reduxState);

    // Add the monitor to resize
    reduxState = monitorLayoutReducer(reduxState, addMonitorRect(monitorId, {x: 100, y: 100}, {x: 200, y: 200}));

    // Invalid newWidth
    expect(monitorLayoutReducer(reduxState, resizeMonitorRect(monitorId, 'Oregon' /* newWidth */, 1 /* newHeight */)))
        .toEqual(reduxState);

    // Invalid newHeight
    expect(monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 1 /* newWidth */)))
        .toEqual(reduxState);

    // newWidth < 0
    expect(monitorLayoutReducer(reduxState, resizeMonitorRect(monitorId, -1 /* newWidth */, 1 /* newHeight */)))
        .toEqual(reduxState);

    // newHeight < 0
    expect(monitorLayoutReducer(reduxState, resizeMonitorRect(monitorId, 1 /* newWidth */, -1 /* newHeight */)))
        .toEqual(reduxState);
});

test('removeMonitorRect', () => {
    let defaultState;
    const monitorId = 1;

    // Add a monitor rect, move it, and remove it
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(monitorId,
        {x: 100, y: 100},
        {x: 200, y: 200}
    ));
    const reduxState2 = monitorLayoutReducer(reduxState, moveMonitorRect(monitorId, 0, 0));
    const reduxState3 = monitorLayoutReducer(reduxState2, removeMonitorRect(monitorId));
    expect(reduxState3.monitors[monitorId]).toBeUndefined();
    // Check that saved positions aren't changed by removing monitor
    expect(reduxState3.savedMonitorPositions).toEqual(reduxState2.savedMonitorPositions);
});

test('invalidRemoveMonitorRect', () => {
    let defaultState;
    const reduxState = monitorLayoutReducer(defaultState, {type: 'initialize'} /* action */);

    // Try to remove a monitor rect that doesn't exist
    expect(monitorLayoutReducer(reduxState, resizeMonitorRect(1)))
        .toEqual(reduxState);
});

test('getInitialPosition_lineUpTopLeft', () => {
    let defaultState;
    const width = 100;
    const height = 200;
    // Add monitors to right and bottom, but there is a space in the top left
    let reduxState = monitorLayoutReducer(defaultState, addMonitorRect(1,
        {x: width + PADDING, y: 0},
        {x: 100, y: height}
    ));
    reduxState = monitorLayoutReducer(defaultState, addMonitorRect(2,
        {x: 0, y: height + PADDING},
        {x: width, y: 100}
    ));

    // Check that the added monitor appears in the space
    const rect = getInitialPosition(reduxState, 3, width, height);
    expect(rect.upperStart).toBeDefined();
    expect(rect.lowerEnd).toBeDefined();
    expect(rect.lowerEnd.x - rect.upperStart.x).toEqual(width);
    expect(rect.lowerEnd.y - rect.upperStart.y).toEqual(height);
    expect(rect.upperStart.x).toEqual(PADDING);
    expect(rect.upperStart.y).toEqual(PADDING);
});

test('getInitialPosition_savedPosition', () => {
    const monitorId = 1;
    const savedX = 100;
    const savedY = 200;
    const width = 7;
    const height = 8;
    const reduxState = {
        monitors: {},
        savedMonitorPositions: {[monitorId]: {x: savedX, y: savedY}}
    };

    // Check that initial position uses saved state
    const rect = getInitialPosition(reduxState, monitorId, width, height);
    expect(rect.upperStart).toBeDefined();
    expect(rect.lowerEnd).toBeDefined();
    expect(rect.lowerEnd.x - rect.upperStart.x).toEqual(width);
    expect(rect.lowerEnd.y - rect.upperStart.y).toEqual(height);
    expect(rect.upperStart.x).toEqual(savedX);
    expect(rect.upperStart.y).toEqual(savedY);
});

test('getInitialPosition_lineUpLeft', () => {
    let defaultState;
    const monitor1EndY = 60;
    // Add a monitor that takes up the upper left corner
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(1, {x: 0, y: 0}, {x: 100, y: monitor1EndY}));

    // Check that added monitor is under it and lines up left
    const rect = getInitialPosition(reduxState, 2, 20 /* width */, 20 /* height */);
    expect(rect.upperStart.y >= monitor1EndY + PADDING).toBeTruthy();
});

test('getInitialPosition_lineUpTop', () => {
    let defaultState;
    const monitor1EndX = 100;
    // Add a monitor that takes up the whole left side
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(1,
        {x: 0, y: 0},
        {x: monitor1EndX, y: SCREEN_HEIGHT}
    ));

    // Check that added monitor is to the right of it and lines up top
    const rect = getInitialPosition(reduxState, 2, 20 /* width */, 20 /* height */);
    expect(rect.upperStart.y).toEqual(PADDING);
    expect(rect.upperStart.x >= monitor1EndX + PADDING).toBeTruthy();
});

test('getInitialPosition_noRoom', () => {
    let defaultState;
    const width = 7;
    const height = 8;
    // Add a monitor that takes up the whole screen
    const reduxState = monitorLayoutReducer(defaultState, addMonitorRect(1,
        {x: 0, y: 0},
        {x: SCREEN_WIDTH, y: SCREEN_HEIGHT}
    ));

    // Check that added monitor exists somewhere (we don't care where)
    const rect = getInitialPosition(reduxState, 2, width, height);
    expect(rect.upperStart).toBeDefined();
    expect(rect.lowerEnd.x - rect.upperStart.x).toEqual(width);
    expect(rect.lowerEnd.y - rect.upperStart.y).toEqual(height);
});
