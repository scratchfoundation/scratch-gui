import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl} from 'react-intl';
import VM from 'scratch-vm';

import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';


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

    loadScratchFile (slot){
        const {
            vm
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }
        return async () => {
            const blob = await fetch(mv2.savedProjectStates[slot.toString()]).then(res => res.blob());
            blob.arrayBuffer().then(buffer => {
                vm.loadProject(buffer);
            });
        };
    }

    render () {
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
                            onClick={this.getSaveToComputerHandler(downloadProjectCallback, '1')}
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
                {/* TODO: Refactor loading into a function*/}

                <div>
                    <button onClick={this.loadScratchFile('0')} >
                        Load from Slot 0
                    </button>
                    <button onClick={this.loadScratchFile('1')} >
                        Load from Slot 1
                    </button>
                    <button onClick={this.loadScratchFile('2')} >
                        Load from Slot 2
                    </button>
                    <button onClick={this.loadScratchFile('3')} >
                        Load from Slot 3
                    </button>
                    <button onClick={this.loadScratchFile('4')} >
                        Load from Slot 4
                    </button>
                    <button onClick={this.loadScratchFile('5')} >
                        Load from Slot 5
                    </button>
                    <button onClick={this.loadScratchFile('6')} >
                        Load from Slot 6
                    </button>
                    <button onClick={this.loadScratchFile('7')} >
                        Load from Slot 7
                    </button>
                    <button onClick={this.loadScratchFile('8')} >
                        Load from Slot 8
                    </button>
                    <button onClick={this.loadScratchFile('9')} >
                        Load from Slot 9
                    </button>
                </div>
            </div>
        );
    }
}

SaveLoadTab.propTypes = {
    editingTarget: PropTypes.string,
    locale: PropTypes.string.isRequired,
    onProjectTelemetryEvent: PropTypes.func,
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
