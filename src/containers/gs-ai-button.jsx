import PropTypes from 'prop-types';
import React from 'react';
import GsAiModal from './gs-ai-modal.jsx';
import ButtonComponent from '../components/button/button.jsx';
import { connect } from 'react-redux';
import {
    openMyai
} from '../reducers/modals';

import lan from '../../mycode/language/Local'

class GsAiButton extends React.Component {
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
                {lan.data.gui_menu_ai}
                {settingVisible ? (
                    <GsAiModal onChangeState ={this.handleConnectStateChang.bind(this)} />
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

GsAiButton.propTypes = {
    settingVisible: PropTypes.bool,
    onSetClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    settingVisible: state.modals.myai
});

const mapDispatchToProps = dispatch => ({
    onSetClick: () => {
        dispatch(openMyai());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsAiButton);
