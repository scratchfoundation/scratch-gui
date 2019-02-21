import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    getIsFetchingWithId,
    getIsLoadingWithId
} from '../reducers/project-state';

const loadingState = state => state.scratchGui.projectState.loadingState;

const fetching = state => getIsFetchingWithId(loadingState(state));

const loading = state => (
    fetching(state) ||
    getIsLoadingWithId(loadingState(state)) ||
    !state.scratchGui.fontsLoaded ||
    state.scratchGui.modals.loadingProject
);

const Condition = function (test) {
    return function (WrappedComponent) {
        const Condition = ({test, children, ...props}) => (
            test ?
                <WrappedComponent {...props}>{children}</WrappedComponent> :
                null
        );

        Condition.propTypes = {
            if: PropTypes.bool,
            children: PropTypes.node
        };

        const mapStateToProps = (state, props) => {
            return {
                test: test(state, props)
            };
        };

        return connect(mapStateToProps)(Condition);
    };
};

Condition.fetching = fetching;
Condition.loading = loading;

export default Condition;
