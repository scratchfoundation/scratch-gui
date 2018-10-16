import React from 'react';
import {Provider} from 'react-redux';
import {mountWithIntl, shallowWithIntl, componentWithIntl} from '../../helpers/intl-helpers.jsx';
import configureStore from 'redux-mock-store';
import SBFileUploader from '../../../src/containers/sb-file-uploader.jsx';

describe('SBFileUploader', () => {
    const mockStore = configureStore();
    let onLoadingFinished;
    let onLoadingStarted;
    let onUpdateProjectTitle;
    let store;

    // Wrap this in a function so it gets test specific states and can be reused.
    const getContainer = function () {
        return (
            <SBFileUploader
                store={store}
                onLoadingFinished={onLoadingFinished}
                onLoadingStarted={onLoadingStarted}
                onUpdateProjectTitle={onUpdateProjectTitle}
            >
                {(renderFileInput, loadProject) => (
                    <div
                        onClick={loadProject}
                    />
                )}
            </SBFileUploader>
        );
    };

    beforeEach(() => {
        store = mockStore({
            scratchGui: {
                projectState: {}
            }
        });
        onUpdateProjectTitle = jest.fn();
        onLoadingFinished = jest.fn();
        onLoadingStarted = jest.fn();
    });

    test('correctly sets title with .sb3 filename', () => {
        const component = mountWithIntl(getContainer());
        const instance = component.instance();
        const projectName = instance.getProjectTitleFromFilename('my project is great.sb3');
        expect(projectName).toBe('my project is great');
    });

    test('correctly sets title with .sb3 filename', () => {
        const component = componentWithIntl(getContainer());
        const projectName = component.getProjectTitleFromFilename('my project is great.sb3');
        expect(projectName).toBe('my project is great');
    });

    test('sets blank title with .sb filename', () => {
        const component = componentWithIntl(getContainer());
        const projectName = component.getProjectTitleFromFilename('my project is great.sb');
        expect(projectName).toBe('');
    });

    test('sets blank title with filename with no extension', () => {
        const component = componentWithIntl(getContainer());
        const projectName = component.getProjectTitleFromFilename('my project is great');
        expect(projectName).toBe('');
    });
});
