import React from 'react';
import configureStore from 'redux-mock-store';
import ProjectLoaderHOC from '../../../src/lib/project-loader-hoc.jsx';
import storage from '../../../src/lib/storage';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

jest.mock('react-ga');

describe('ProjectLoaderHOC', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({scratchGui: {}});
    });

    test('when there is an id, it tries to load that project', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        const originalLoad = storage.load;
        storage.load = jest.fn((type, id) => Promise.resolve({data: id}));
        const mounted = mountWithIntl(
            <WrappedComponent
                projectId="100"
                store={store}
            />
        );
        expect(mounted.props().projectId).toEqual('100');
        expect(storage.load).toHaveBeenLastCalledWith(
            storage.AssetType.Project, '100', storage.DataFormat.JSON
        );
        storage.load = originalLoad;
    });

    test('when there is no project data, it renders null', () => {
        const Component = ({projectData}) => <div>{projectData}</div>;
        const WrappedComponent = ProjectLoaderHOC(Component);
        const originalLoad = storage.load;
        storage.load = jest.fn(() => Promise.resolve(null));
        const mounted = mountWithIntl(<WrappedComponent store={store} />);
        storage.load = originalLoad;
        const mountedDiv = mounted.find('div');
        expect(mountedDiv.exists()).toEqual(false);
    });

});
