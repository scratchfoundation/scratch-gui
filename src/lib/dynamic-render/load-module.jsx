import React from 'react';

// A set of extra HOCs to handle some annoying details of this interface.

const loadNull = loadModule => (
    function DelayLoadNull () {
        loadModule();
        return null;
    }
);

const loadChildren = (
    function DelayLoadChildren ({children}) {
        if (children) {
            children();
        }
        return null;
    }
);

const loadComponent = loadModule => (
    function DelayLoadComponent ({children, ...props}) {
        const _Component = loadModule();
        const Component = _Component.default || _Component;
        return <Component {...props}>{children}</Component>;
    }
);

export {
    loadNull,
    loadChildren,
    loadComponent
};
