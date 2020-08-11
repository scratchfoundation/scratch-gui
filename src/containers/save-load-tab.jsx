import PropTypes from 'prop-types';
import React from 'react';
// import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl, FormattedMessage} from 'react-intl';
import VM from 'scratch-vm';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
// import DragConstants from '../lib/drag-constants';

import {connect} from 'react-redux';

import {
    closeSoundLibrary,
    openSoundLibrary,
    openSoundRecorder
} from '../reducers/modals';

import {
    activateTab,
    COSTUMES_TAB_INDEX
} from '../reducers/editor-tab';

import {setRestore} from '../reducers/restore-deletion';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';
import collectMetadata from '../lib/collect-metadata';
import {MenuItem} from '../components/menu/menu.jsx';
import SB3Downloader from './sb3-downloader.jsx';

class SaveLoadTab extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor (props) {
        super(props);
        /* bindAll(this, [
            'handleSelectSound',
            'handleDeleteSound',
            'handleDuplicateSound',
            'handleExportSound',
            'handleNewSound',
            'handleSurpriseSound',
            'handleFileUploadClick',
            'handleSoundUpload',
            'handleDrop',
            'setFileInput',
            'downloadProject'
        ]);
        this.state = {selectedSoundIndex: 0};*/
    }

    componentWillReceiveProps (nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (!target || !target.sounds) {
            return;
        }

        // If switching editing targets, reset the sound index
        if (this.props.editingTarget !== editingTarget) {
            this.setState({selectedSoundIndex: 0});
        } else if (this.state.selectedSoundIndex > target.sounds.length - 1) {
            this.setState({selectedSoundIndex: Math.max(target.sounds.length - 1, 0)});
        }
    }

    /* handleSelectSound (soundIndex) {
        this.setState({selectedSoundIndex: soundIndex});
    }*/

    /* handleDeleteSound (soundIndex) {
        const restoreFun = this.props.vm.deleteSound(soundIndex);
        if (soundIndex >= this.state.selectedSoundIndex) {
            this.setState({selectedSoundIndex: Math.max(0, soundIndex - 1)});
        }
        this.props.dispatchUpdateRestore({restoreFun, deletedItem: 'Sound'});
    }*/

    /* handleExportSound (soundIndex) {
        const item = this.props.vm.editingTarget.sprite.sounds[soundIndex];
        const blob = new Blob([item.asset.data], {type: item.asset.assetType.contentType});
        downloadBlob(`${item.name}.${item.asset.dataFormat}`, blob);
    }*/

    /* handleDuplicateSound (soundIndex) {
        this.props.vm.duplicateSound(soundIndex).then(() => {
            this.setState({selectedSoundIndex: soundIndex + 1});
        });
    }*/

    getSaveToComputerHandler (downloadProjectCallback, slot) {
        return () => {
            // this.props.onRequestCloseFile();
            downloadProjectCallback(slot);
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
                this.props.onProjectTelemetryEvent('projectDidSave', metadata);
            }
        };
    }

    /* handleNewSound () {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        const sprite = this.props.vm.editingTarget.sprite;
        const sounds = sprite.sounds ? sprite.sounds : [];
        this.setState({selectedSoundIndex: Math.max(sounds.length - 1, 0)});
    }*/

    /* handleSurpriseSound () {
        const soundItem = soundLibraryContent[Math.floor(Math.random() * soundLibraryContent.length)];
        const vmSound = {
            format: soundItem.format,
            md5: soundItem.md5,
            rate: soundItem.rate,
            sampleCount: soundItem.sampleCount,
            name: soundItem.name
        };
        this.props.vm.addSound(vmSound).then(() => {
            this.handleNewSound();
        });
    }*/

    /* handleFileUploadClick () {
        this.fileInput.click();
    }*/

    /* handleSoundUpload (e) {
        const storage = this.props.vm.runtime.storage;
        this.props.onShowImporting();
        handleFileUpload(e.target, (buffer, fileType, fileName, fileIndex, fileCount) => {
            soundUpload(buffer, fileType, storage, newSound => {
                newSound.name = fileName;
                this.props.vm.addSound(newSound).then(() => {
                    this.handleNewSound();
                    if (fileIndex === fileCount - 1) {
                        this.props.onCloseImporting();
                    }
                });
            });
        }, this.props.onCloseImporting);
    }*/

    /* handleDrop (dropInfo) {
        if (dropInfo.dragType === DragConstants.SOUND) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeSound = sprite.sounds[this.state.selectedSoundIndex];

            this.props.vm.reorderSound(this.props.vm.editingTarget.id,
                dropInfo.index, dropInfo.newIndex);

            this.setState({selectedSoundIndex: sprite.sounds.indexOf(activeSound)});
        } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
            this.props.onActivateCostumesTab();
            this.props.vm.addCostume(dropInfo.payload.body, {
                name: dropInfo.payload.name
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
            this.props.vm.addSound({
                md5: dropInfo.payload.body,
                name: dropInfo.payload.name
            }).then(this.handleNewSound);
        }
    }*/

    /* setFileInput (input) {
        this.fileInput = input;
    }*/

    render () {
        const {
            dispatchUpdateRestore,
            intl,
            isRtl,
            vm
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        return (
            <div>
                <div>

                    {/* SAVE BUTTONS */}

                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '0')}
                        >
                            Save Slot 0
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback,'1')}
                        >
                            Save Slot 1
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '2')}
                        >
                            Save Slot 2
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '3')}
                        >
                            Save Slot 3
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '4')}
                        >
                            Save Slot 4
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '5')}
                        >
                            Save Slot 5
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '6')}
                        >
                            Save Slot 6
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '7')}
                        >
                            Save Slot 7
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '8')}
                        >
                            Save Slot 8
                        </MenuItem>
                    )}</SB3Downloader>
                    <SB3Downloader>{(className, downloadProjectCallback) => (
                        <MenuItem
                            className={className}
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '9')}
                        >
                            Save Slot 9
                        </MenuItem>
                    )}</SB3Downloader>
                </div>

                {/* LOAD BUTTONS */}
                {/*TODO: Refactor loading into a function*/}


                <div>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['0']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 0
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['1']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 1
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['2']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 2
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['3']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 3
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['4']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 4
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['5']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 5
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['6']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 6
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['7']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 7
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['8']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 8
                    </button>
                    <button
                        onClick={
                            function () {
                                (async () => {
                                    const parsed = JSON.parse(mv2.savedProjectStates['9']);
                                    const blob = await fetch(parsed.blob).then(res => res.blob());
                                    blob.arrayBuffer().then(buffer => {
                                        vm.loadProject(buffer)
                                            .then(() => {
                                            });
                                    });
                                })();
                            }
                        }
                    >
                        Load from Slot 9
                    </button>
                </div>
            </div>
        );
    }
}

SaveLoadTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    isRtl: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    onActivateCostumesTab: PropTypes.func.isRequired,
    onCloseImporting: PropTypes.func.isRequired,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onShowImporting: PropTypes.func.isRequired,
    projectTitle: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            sounds: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired
            }))
        })
    }),
    stage: PropTypes.shape({
        sounds: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    isRtl: state.locales.isRtl,
    locale: state.locales.locale,
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    soundLibraryVisible: state.scratchGui.modals.soundLibrary,
    soundRecorderVisible: state.scratchGui.modals.soundRecorder
});

const mapDispatchToProps = dispatch => ({
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onNewSoundFromLibraryClick: e => {
        e.preventDefault();
        dispatch(openSoundLibrary());
    },
    onNewSoundFromRecordingClick: () => {
        dispatch(openSoundRecorder());
    },
    onRequestCloseSoundLibrary: () => {
        dispatch(closeSoundLibrary());
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default errorBoundaryHOC('Save / Load Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(SaveLoadTab))
);
