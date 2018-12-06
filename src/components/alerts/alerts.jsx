import React from 'react';
import PropTypes from 'prop-types';

import Box from '../box/box.jsx';
import Alert from '../../containers/alert.jsx';

const AlertsComponent = ({
    alertsList,
    className,
    onCloseAlert
}) => (
    <Box
        bounds="parent"
        className={className}
    >
        {alertsList.map((a, index) => (
            <Alert
                closeButton={a.closeButton}
                content={a.content}
                extensionId={a.extensionId}
                extensionName={a.extensionName}
                iconSpinner={a.iconSpinner}
                iconURL={a.iconURL}
                index={index}
                key={index}
                level={a.level}
                message={a.message}
                showDownload={a.showDownload}
                showReconnect={a.showReconnect}
                showSaveNow={a.showSaveNow}
                onCloseAlert={onCloseAlert}
            />
        ))}
    </Box>
);

AlertsComponent.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func
};

export default AlertsComponent;
