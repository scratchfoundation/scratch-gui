import PropTypes from 'prop-types';
import React from 'react';
import GsConnect from './gs-connect.jsx';
import ButtonComponent from '../components/button/button.jsx';
import {connect} from 'react-redux';
import {
    openConnect
} from '../reducers/modals';

import lan from '../../mycode/language/Local'

class GsConnectButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            connetState:false
        }
    }
    componentWillMount() {
    }
    render () {
        const {
            connectVisible,
            onConnectClick,
            ...props
        } = this.props;

        return (
            <ButtonComponent
                onClick={onConnectClick}
                {...props}
            >
                {
                    this.state.connetState ?
                    lan.data.gui_menu_connect1 : lan.data.gui_menu_connect0
                }

                {connectVisible ? (
                    <GsConnect onChangeState ={this.handleConnectStateChang.bind(this)} />
                ) : null}
            </ButtonComponent>
        );
    }

    /*
    * 改变连接的状态
    * */
    handleConnectStateChang(value ){
        if(value !== this.state.connetState){
            this.setState({
                connetState:value
            });
        }
    }
}

GsConnectButton.propTypes = {
    connectVisible: PropTypes.bool,
    onConnectClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    connectVisible: state.modals.connect
});

const mapDispatchToProps = dispatch => ({
    onConnectClick: () => {
        dispatch(openConnect());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsConnectButton);
