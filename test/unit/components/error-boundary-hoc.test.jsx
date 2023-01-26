import React from 'react';
import {Provider} from 'react-redux';
const {mountWithIntl} = require('../../helpers/intl-helpers.jsx');

import configureStore from 'redux-mock-store';

import CrashMessageComponent from '../../../src/components/crash-message/crash-message.jsx';
import ErrorBoundary from '../../../src/containers/error-boundary.jsx';

const ChildComponent = () => <div>hello</div>;

describe('ErrorBoundary', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            locales: {
                isRtl: false,
                locale: 'en-US'
            }
        });
    });

    test('ErrorBoundary shows children before error and CrashMessageComponent after', () => {
        const child = <ChildComponent />;
        const wrapper = mountWithIntl(
            <Provider store={store}><ErrorBoundary action="test">{child}</ErrorBoundary></Provider>
        );
        const errorSite = wrapper.childAt(0).childAt(0);

        // @ts-ignore: 'onReload' prop is absent because this component will only be used for pattern matching
        const crashMessagePattern = <CrashMessageComponent />;

        expect(wrapper.containsMatchingElement(child)).toBeTruthy();
        expect(wrapper.containsMatchingElement(crashMessagePattern)).toBeFalsy();

        errorSite.simulateError(new Error('fake error for testing purposes'));

        expect(wrapper.containsMatchingElement(child)).toBeFalsy();
        expect(wrapper.containsMatchingElement(crashMessagePattern)).toBeTruthy();
    });
});
