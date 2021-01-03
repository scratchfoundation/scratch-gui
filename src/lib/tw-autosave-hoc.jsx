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
                    this.timeout = null;
                }
            }
        }
        componentWillUnmount () {
            clearTimeout(this.timeout);
        }
        async autosave () {
            try {
                this.props.onAutosavingStart();
                await AutoSaveAPI.save(this.props.vm);
            } catch (err) {
                // eslint-disable-next-line no-alert
                alert(err);
            }
            this.timeout = null;
            // Intentional delay.
            setTimeout(() => {
                this.props.onAutosavingFinish();
                if (this.timeout === null && this.props.projectChanged) {
                    this.timeout = setTimeout(this.autosave, AUTOSAVE_TIMEOUT);
                }
            }, 250);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                projectChanged,
                onAutosavingStart,
                onAutosavingFinish,
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
        onAutosavingStart: PropTypes.func,
        onAutosavingFinish: PropTypes.func,
        vm: PropTypes.instanceOf(VM)
    };
    const mapStateToProps = state => ({
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        projectChanged: state.scratchGui.projectChanged,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onAutosavingStart: () => dispatch(showStandardAlert('twAutosaving')),
        onAutosavingFinish: () => dispatch(closeAlertWithId('twAutosaving'))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(AutoSaveComponent);
};

export {
    TWAutoSaveHOC as default
};
