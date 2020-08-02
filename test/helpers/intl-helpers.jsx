/*
 * Helpers for using enzyme and react-test-renderer with react-intl
 * Directly from https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {IntlProvider, intlShape} from 'react-intl';
import {mount, shallow} from 'enzyme';

const intlProvider = new IntlProvider({locale: 'en'}, {});
const {intl} = intlProvider.getChildContext();

const nodeWithIntlProp = node => React.cloneElement(node, {intl});

const shallowWithIntl = (node, {context} = {}) => shallow(
    nodeWithIntlProp(node),
    {
        context: Object.assign({}, context, {intl})
    }
);

const mountWithIntl = (node, {context, childContextTypes} = {}) => mount(
    nodeWithIntlProp(node),
    {
        context: Object.assign({}, context, {intl}),
        childContextTypes: Object.assign({}, {intl: intlShape}, childContextTypes)
    }
);

// react-test-renderer component for use with snapshot testing
const componentWithIntl = (children, props = {locale: 'en'}) => renderer.create(
    <IntlProvider {...props}>{children}</IntlProvider>
);

export {
    componentWithIntl,
    shallowWithIntl,
    mountWithIntl
};
