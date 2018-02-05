import PropTypes from 'prop-types';
import React from 'react';
import GsSettingModal from './gs-setting-modal.jsx';
import ButtonComponent from '../components/button/button.jsx';
import { connect } from 'react-redux';
import {
    openSetting
} from '../reducers/modals';

import lan from '../../mycode/language/Local'

class GsSettingButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            settingState:false
        }
    }
    componentWillMount() {
    }
    render () {
        const {
            settingVisible,
            onSetClick,
            ...props
        } = this.props;

        return (
            <ButtonComponent
                onClick={onSetClick}
                {...props}
            >
                <i className="fa fa-cog" aria-hidden="true"></i> {lan.data.gui_menu_setting}

                {settingVisible ? (
                    <GsSettingModal onChangeState ={this.handleConnectStateChang.bind(this)} />
                ) : null}
            </ButtonComponent>
        );
    }

    /*
    * 改变连接的状态
    * */
    handleConnectStateChang(value ){
        if(value !== this.state.settingState){
            this.setState({
                settingState:value
            });
        }
    }
}

GsSettingButton.propTypes = {
    settingVisible: PropTypes.bool,
    onSetClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    settingVisible: state.modals.setting
});

const mapDispatchToProps = dispatch => ({
    onSetClick: () => {
        dispatch(openSetting());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsSettingButton);
