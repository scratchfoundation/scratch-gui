import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';
import {getIsShowingProject} from '../reducers/project-state';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import AutoSaveAPI from './tw-indexeddb-autosave-api';

// TODO: increase this
const AUTOSAVE_TIMEOUT = 1000 * 1;

const TWAutoSaveHOC = function (WrappedComponent) {
    class AutoSaveComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'autosave'
            ]);
            this.timeout = null;
        }
        componentDidUpdate (prevProps) {
            if (
                this.props.projectChanged !== prevProps.projectChanged ||
                this.props.isShowingProject !== prevProps.isShowingProject
            ) {
                if (this.props.projectChanged && this.props.isShowingProject) {
                    // Project was modified; queue autosave.
                    this.timeout = setTimeout(this.autosave, AUTOSAVE_TIMEOUT);
                } else {
                    // Project was saved; abort autosave.
                    clearTimeout(this.timeout);
                }
            }
        }
        componentWillUnmount () {
            clearTimeout(this.timeout);
        }
        async autosave () {
            try {
                this.props.onStartAutosaving();
                AutoSaveAPI.save(this.props.vm);
            } finally {
                // Intentional delay.
                // TODO: remove delay?
                // TODO: error alert?
                setTimeout(() => {
                    this.props.onFinishAutosaving();
                    if (this.props.projectChanged) {
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(this.autosave, AUTOSAVE_TIMEOUT);
                    }
                }, 250);
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectChanged,
                onStartAutosaving,
                onFinishAutosaving,
                vm,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    {...props}
                />
            );
        }
    }
    AutoSaveComponent.propTypes = {
        isShowingProject: PropTypes.bool,
        projectChanged: PropTypes.bool,
        onStartAutosaving: PropTypes.func,
        onFinishAutosaving: PropTypes.func,
        vm: PropTypes.instanceOf(VM)
    };
    const mapStateToProps = state => ({
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        projectChanged: state.scratchGui.projectChanged,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onStartAutosaving: () => dispatch(showStandardAlert('twAutosaving')),
        onFinishAutosaving: () => dispatch(closeAlertWithId('twAutosaving'))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(AutoSaveComponent);
};

export {
    TWAutoSaveHOC as default
};
