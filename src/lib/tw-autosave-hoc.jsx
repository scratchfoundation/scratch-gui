import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import log from './log';

// TODO: increase this
const AUTOSAVE_TIMEOUT = 1000 * 1;

// TODO: refactor
const deleteNonexistantKeys = (store, keys) => new Promise((resolve, reject) => {
    const removed = [];
    const exists = [];
    const cursorRequest = store.openCursor();
    cursorRequest.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
            const key = cursor.key;
            if (keys.includes(key)) {
                exists.push(key);
            } else {
                cursor.delete();
                removed.push(key);
            }
            cursor.continue();
        } else {
            resolve({
                removed,
                exists
            });
        }
    };
    cursorRequest.onerror = e => {
        // TODO: look at error object
        reject(new Error('Cursor error'));
    };
});

const TWAutoSaveHOC = function (WrappedComponent) {
    class AutoSaveComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'autosave'
            ]);
            this.timeout = null;
            this.db = null;
            this.encoder = new TextEncoder();
        }
        componentDidMount () {
            const request = indexedDB.open('TW_AutoSave', 1);

            request.onupgradeneeded = e => {
                const db = e.target.result;
                db.createObjectStore('project', {
                    keyPath: 'file'
                });
            };

            request.onsuccess = e => {
                const db = e.target.result;
                this.db = db;
            };
        }
        componentDidUpdate (prevProps) {
            if (this.props.projectChanged && !prevProps.projectChanged) {
                // Project was modified; queue
                this.timeout = setTimeout(this.autosave, AUTOSAVE_TIMEOUT);
            } else if (!this.props.projectChanged && prevProps.projectChanged) {
                // Project was saved; abort
                clearTimeout(this.timeout);
            }
        }
        componentWillUnmount () {
            this.db.close();
            clearTimeout(this.timeout);
        }
        autosave () {
            this.props.onStartAutosaving();
            this._autosave()
                .then(() => {
                    this.props.onFinishAutosaving();
                    if (this.props.projectChanged) {
                        this.timeout = setTimeout(this.autosave, AUTOSAVE_TIMEOUT);
                    }
                })
                .catch(err => {
                    // TODO: show error
                    log.error(err);
                    this.props.onFinishAutosaving();
                });
        }
        async _autosave () {
            const files = this.props.vm.saveProjectSb3DontZip();
            const transaction = this.db.transaction('project', 'readwrite');
            const projectStore = transaction.objectStore('project');

            const {exists} = await deleteNonexistantKeys(projectStore, Object.keys(files));

            for (const file of Object.keys(files)) {
                if (file === 'project.json' || !exists.includes(file)) {
                    projectStore.put({
                        file,
                        data: files[file].buffer
                    });
                }
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
        projectChanged: PropTypes.bool,
        onStartAutosaving: PropTypes.func,
        onFinishAutosaving: PropTypes.func,
        vm: PropTypes.instanceOf(VM)
    };
    const mapStateToProps = state => ({
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
