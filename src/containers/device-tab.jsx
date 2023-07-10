import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl} from 'react-intl';
import VM from 'oeg-stem-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
// import deviceIcon from '../components/asset-panel/icon--device.svg';
// import deviceIconRtl from '../components/asset-panel/icon--device-rtl.svg';
// import addDeviceFromLibraryIcon from '../components/asset-panel/icon--add-device-lib.svg';
// import addDeviceFromRecordingIcon from '../components/asset-panel/icon--add-device-record.svg';
// import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';
// import surpriseIcon from '../components/action-menu/icon--surprise.svg';
// import searchIcon from '../components/action-menu/icon--search.svg';

import DeviceLibrary from './device-library.jsx';

import deviceLibraryContent from '../lib/libraries/devices.json';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import DragConstants from '../lib/drag-constants';
import downloadBlob from '../lib/download-blob';

import {connect} from 'react-redux';

// import {
//     // closeDeviceLibrary,
//     // openDeviceLibrary,
//     // openDeviceRecorder
// } from '../reducers/modals';

import {
    activateTab,
    DEVICE_TAB_INDEX
} from '../reducers/editor-tab';

import {setRestore} from '../reducers/restore-deletion';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';

class DeviceTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectDevice',
            'handleDeleteDevice',
            'handleDuplicateDevice',
            'handleExportDevice',
            'handleNewDevice',
            'handleSurpriseDevice',
            'handleFileUploadClick',
            'handleDeviceUpload',
            'handleDrop',
            'setFileInput'
        ]);
        this.state = {selectedDeviceIndex: 0};
    }

    componentWillReceiveProps (nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (!target || !target.devices) {
            return;
        }

        // If switching editing targets, reset the device index
        if (this.props.editingTarget !== editingTarget) {
            this.setState({selectedDeviceIndex: 0});
        } else if (this.state.selectedDeviceIndex > target.devices.length - 1) {
            this.setState({selectedDeviceIndex: Math.max(target.devices.length - 1, 0)});
        }
    }

    handleSelectDevice (deviceIndex) {
        this.setState({selectedDeviceIndex: deviceIndex});
    }

    handleDeleteDevice (deviceIndex) {
        const restoreFun = this.props.vm.deleteDevice(deviceIndex);
        if (deviceIndex >= this.state.selectedDeviceIndex) {
            this.setState({selectedDeviceIndex: Math.max(0, deviceIndex - 1)});
        }
        this.props.dispatchUpdateRestore({restoreFun, deletedItem: 'Device'});
    }

    handleExportDevice (deviceIndex) {
        const item = this.props.vm.editingTarget.sprite.devices[deviceIndex];
        const blob = new Blob([item.asset.data], {type: item.asset.assetType.contentType});
        downloadBlob(`${item.name}.${item.asset.dataFormat}`, blob);
    }

    handleDuplicateDevice (deviceIndex) {
        this.props.vm.duplicateDevice(deviceIndex).then(() => {
            this.setState({selectedDeviceIndex: deviceIndex + 1});
        });
    }

    handleNewDevice () {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        const sprite = this.props.vm.editingTarget.sprite;
        const devices = sprite.devices ? sprite.devices : [];
        this.setState({selectedDeviceIndex: Math.max(devices.length - 1, 0)});
    }

    handleSurpriseDevice () {
        const deviceItem = deviceLibraryContent[Math.floor(Math.random() * deviceLibraryContent.length)];
        const vmDevice = {
            format: deviceItem.dataFormat,
            md5: deviceItem.md5ext,
            rate: deviceItem.rate,
            sampleCount: deviceItem.sampleCount,
            name: deviceItem.name
        };
        this.props.vm.addDevice(vmDevice).then(() => {
            this.handleNewDevice();
        });
    }

    handleFileUploadClick () {
        this.fileInput.click();
    }

    handleDrop (dropInfo) {
        if (dropInfo.dragType === DragConstants.SOUND) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeDevice = sprite.devices[this.state.selectedDeviceIndex];

            this.props.vm.reorderDevice(this.props.vm.editingTarget.id,
                dropInfo.index, dropInfo.newIndex);

            this.setState({selectedDeviceIndex: sprite.devices.indexOf(activeDevice)});
        } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
            this.props.onActivateCostumesTab();
            this.props.vm.addCostume(dropInfo.payload.body, {
                name: dropInfo.payload.name
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
            this.props.vm.addDevice({
                md5: dropInfo.payload.body,
                name: dropInfo.payload.name
            }).then(this.handleNewDevice);
        }
    }

    setFileInput (input) {
        this.fileInput = input;
    }

    render () {
        const {
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            intl,
            isRtl,
            vm,
            onNewDeviceFromLibraryClick
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        const sprite = vm.editingTarget.sprite;

        const devices = sprite.devices ? sprite.devices.map(device => (
            {
                url: '', // TODO
                name: device.name,
                details: (device.sampleCount / device.rate).toFixed(2),
                dragPayload: device
            }
        )) : [];

        const messages = defineMessages({
            fileUploadDevice: {
                defaultMessage: 'Upload Device',
                description: 'Button to upload device from file in the editor tab',
                id: 'gui.deviceTab.fileUploadDevice'
            },
            surpriseDevice: {
                defaultMessage: 'Surprise',
                description: 'Button to get a random device in the editor tab',
                id: 'gui.deviceTab.surpriseDevice'
            },
            recordDevice: {
                defaultMessage: 'Record',
                description: 'Button to record a device in the editor tab',
                id: 'gui.deviceTab.recordDevice'
            },
            addDevice: {
                defaultMessage: 'Choose a Device',
                description: 'Button to add a device in the editor tab',
                id: 'gui.deviceTab.addDeviceFromLibrary'
            }
        });

        return (
            <AssetPanel
                buttons={[{
                    title: intl.formatMessage(messages.addDevice),
                    // img: addDeviceFromLibraryIcon,
                    onClick: onNewDeviceFromLibraryClick
                }]}
                dragType={DragConstants.SOUND}
                isRtl={isRtl}
                items={devices}
                selectedItemIndex={this.state.selectedDeviceIndex}
                onDeleteClick={this.handleDeleteDevice}
                onDrop={this.handleDrop}
                onDuplicateClick={this.handleDuplicateDevice}
                onExportClick={this.handleExportDevice}
                onItemClick={this.handleSelectDevice}
            >
                {this.props.deviceLibraryVisible ? (
                    <DeviceLibrary
                        vm={this.props.vm}
                        onNewDevice={this.handleNewDevice}
                        onRequestClose={this.props.onRequestCloseDeviceLibrary}
                    />
                ) : null}
            </AssetPanel>
        );
    }
}

DeviceTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    intl: intlShape,
    isRtl: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func.isRequired,
    onNewDeviceFromLibraryClick: PropTypes.func.isRequired,
    onRequestCloseDeviceLibrary: PropTypes.func.isRequired,
    deviceLibraryVisible: PropTypes.bool,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            devices: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired
            }))
        })
    }),
    stage: PropTypes.shape({
        devices: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    isRtl: state.locales.isRtl,
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    deviceLibraryVisible: state.scratchGui.modals.deviceLibrary,
    deviceRecorderVisible: state.scratchGui.modals.deviceRecorder
});

const mapDispatchToProps = dispatch => ({
    onActivateCostumesTab: () => dispatch(activateTab(DEVICE_TAB_INDEX)),
    onNewDeviceFromLibraryClick: e => {
        e.preventDefault();
        // dispatch(openDeviceLibrary());
    },
    onRequestCloseDeviceLibrary: () => {
        // dispatch(closeDeviceLibrary());
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default errorBoundaryHOC('Device Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(DeviceTab))
);
