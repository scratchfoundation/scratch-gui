import PropTypes from 'prop-types';
import React from 'react';
import GsFirmwareModal from './gs-firmware-modal.jsx';
import ButtonComponent from '../components/button/button.jsx';
import lan from '../../mycode/language/Local'
import {connect} from 'react-redux';

import {
    openFirmware
} from '../reducers/modals';

class GsFirmwareButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            firmwareVisible,
            onFirmwareClick,
            ...props
        } = this.props;

        return (
            <ButtonComponent
                onClick={onFirmwareClick}
                {...props}
            >
                <i className="fa fa-refresh" aria-hidden="true"></i> {lan.data.gui_menu_update }

                {firmwareVisible ? (
                    <GsFirmwareModal />
                ) : null}
            </ButtonComponent>
        );
    }
}

GsFirmwareButton.propTypes = {
    firmwareVisible: PropTypes.bool,
    onFirmwareClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    firmwareVisible: state.modals.firmware
});

const mapDispatchToProps = dispatch => ({
    onFirmwareClick: () => {
        dispatch(openFirmware());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsFirmwareButton);
