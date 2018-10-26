import React from 'react';
import PropTypes from 'prop-types';

import Box from '../box/box.jsx';
import Alert from '../../containers/alert.jsx';
import VM from 'scratch-vm';

const AlertsComponent = ({
    alertsList,
    className,
    onCloseAlert,
    vm
}) => (
    <Box
        bounds="parent"
        className={className}
    >
        {alertsList.map((a, index) => (
            <Alert
                iconURL={a.iconURL}
                index={index}
                key={index}
                message={a.message}
                vm={vm}
                onCloseAlert={onCloseAlert}
            />
        ))}
    </Box>
);

AlertsComponent.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default AlertsComponent;
