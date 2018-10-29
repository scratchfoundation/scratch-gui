import React from 'react';
import configureStore from 'redux-mock-store';

import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

import ProjectFetcherHOC from '../../../src/lib/project-fetcher-hoc.jsx';
import storage from '../../../src/lib/storage';
import {LoadingState} from '../../../src/reducers/project-state';

jest.mock('react-ga');

describe('ProjectFetcherHOC', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectState: {}
            }
        });
    });

    test('when there is an id, it tries to update the store with that id', () => {
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = ProjectFetcherHOC(Component);
        const mockSetProjectIdFunc = jest.fn();
        mountWithIntl(
            <WrappedComponent
                projectId="100"
                setProjectId={mockSetProjectIdFunc}
                store={store}
            />
        );
        expect(mockSetProjectIdFunc.mock.calls[0][0]).toBe('100');
    });
    test('when there is a reduxProjectId and isFetchingWithProjectId is true, it loads the project', () => {
        const mockedOnFetchedProject = jest.fn();
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve({data: id}));
        const Component = ({projectId}) => <div>{projectId}</div>;
        const WrappedComponent = ProjectFetcherHOC(Component);
        const mounted = mountWithIntl(
            <WrappedComponent
                store={store}
                onFetchedProjectData={mockedOnFetchedProject}
            />
        );
        mounted.setProps({
            reduxProjectId: '100',
            isFetchingWithId: true,
            loadingState: LoadingState.FETCHING_WITH_ID
        });
        expect(storage.load).toHaveBeenLastCalledWith(
            storage.AssetType.Project, '100', storage.DataFormat.JSON
        );
        storage.load = originalLoad;
        // nextTick needed since storage.load is async, and onFetchedProject is called in its then()
        process.nextTick(
            () => expect(mockedOnFetchedProject)
                .toHaveBeenLastCalledWith('100', LoadingState.FETCHING_WITH_ID)
        );
    });
});
