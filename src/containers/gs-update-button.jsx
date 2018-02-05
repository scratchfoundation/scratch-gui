import PropTypes from 'prop-types';
import React from 'react';
import GsUpdateModal from './gs-update-modal.jsx';
import ButtonComponent from '../components/button/button.jsx';
import lan from '../../mycode/language/Local'
import {connect} from 'react-redux';

import {
    openUpdate
} from '../reducers/modals';

class GsUpdateButton extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            updateVisible,
            onUpdateClick,
            ...props
        } = this.props;

        return (
            <ButtonComponent
                onClick={onUpdateClick}
                {...props}
            >
                {lan.data.gui_online_update_title }

                {updateVisible ? (
                    <GsUpdateModal />
                ) : null}
            </ButtonComponent>
        );
    }
}

GsUpdateButton.propTypes = {
    updateVisible: PropTypes.bool,
    onUpdateClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    updateVisible: state.modals.update
});

const mapDispatchToProps = dispatch => ({
    onUpdateClick: () => {
        dispatch(openUpdate());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsUpdateButton);
