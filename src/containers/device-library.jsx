import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'oeg-stem-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import deviceLibraryContent from '../lib/libraries/devices/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import deviceIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    deviceTitle: {
        defaultMessage: 'Choose an Device',
        description: 'Heading for the device library',
        id: 'gui.deviceLibrary.chooseAnDevice'
    },
    deviceUrl: {
        defaultMessage: 'Enter the URL of the device',
        description: 'Prompt for unofficial device url',
        id: 'gui.deviceLibrary.deviceUrl'
    }
});

class DeviceLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        const id = item.deviceId;
        let url = item.deviceURL ? item.deviceURL : id;
        if (!item.disabled && !id) {
            // eslint-disable-next-line no-alert
            url = prompt(this.props.intl.formatMessage(messages.deviceUrl));
        }
        if (id && !item.disabled) {
            if (this.props.vm.deviceManager.isDeviceLoaded(url)) {
                this.props.onCategorySelected(id);
            } else {
                this.props.vm.deviceManager.loadDeviceURL(url).then(() => {
                    this.props.onCategorySelected(id);
                });
            }
        }
    }
    render () {
        const deviceLibraryThumbnailData = deviceLibraryContent.map(device => ({
            rawURL: device.iconURL || deviceIcon,
            ...device
        }));
        return (
            <LibraryComponent
                data={deviceLibraryThumbnailData}
                filterable={false}
                id="deviceLibrary"
                title={this.props.intl.formatMessage(messages.deviceTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

DeviceLibrary.propTypes = {
    intl: intlShape.isRequired,
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(DeviceLibrary);
