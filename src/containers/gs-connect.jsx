import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import GsConnectComponent from '../components/gs-connect/gs-connect.jsx';
import robot from '../../mycode/services/robot/Robot.js'

import {
    closeConnect
} from '../reducers/modals';

class GsConnect extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
        this.state = {
            data :{portlist:[],msg:'',portstate:false, port:''}
        };
        this.inputValuePort='';
    }

    componentDidMount() {
        this.onComeIn();
    }

    componentWillUnmount(){

    }

    render() {
        return (
            <GsConnectComponent
                onCancel={this.handleCancel.bind(this)}
                onClear={this.handleClear.bind(this)}
                onOk={this.handleConnect.bind(this)}
                onRefresh={this.handleRefresh.bind(this)}
                data ={this.state.data}
                onChangePort={this.handleChangePort.bind(this)}
                onTest ={this.handleTest.bind(this)}
            />
        )
    }

    /*
    * 关窗口
    * */
    handleCancel (e) {
        e.stopPropagation();
        this.props.onClose();
    }

    handleClear(){
        try{
            //删除所有旧串口数据
            SEP.RobotManage.removeAll();
            let data = this.state.data ;
            data.msg ='Successful operation!';
            data.port = '';
            data.portstate = false;
            this.setState({
                data:data
            });
        }catch(error){
            console.error(error);
        }
    }

    handleConnect () {
        this.connectPort();
    }

    /*
    刷新端口值
    * */
    handleRefresh () {
        this.getPort();
    }

    handleChangePort(e){
        this.inputValuePort = e.target.value ;
    }

    handleTest(){
        this.testSound();
    }
    /*
    * 页面初始化
    * */
    onComeIn(){
        try{
            const robot = SEP.RobotManage.getCurrentRobot();
            if(robot){
                let data = this.state.data ;
                data.portstate =true;
                data.port = robot.comName ;
                data.msg ='';
                this.setState({
                    data:data
                });
            }

        }catch (error){
            console.error(error);
        }
        this.getPort();
    }

    /*
    * 连接串口
    * */
    connectPort(){
        if(this.inputValuePort ===''){
            let data = this.state.data ;
            data.msg = 'Please select a serial port!';
            this.setState({
                data:data
            });
            return;
        }
        try{
            //删除所有旧串口数据
            SEP.RobotManage.removeAll();
        }catch(error){
            console.error(error);
        }
        try{
            SEP.RobotManage.addByPort(this.inputValuePort);
            let data = this.state.data ;
            data.msg ='';
            data.port = this.inputValuePort;
            data.portstate = true;
            this.setState({
                data:data
            });
            if(this.props.onChangeState ){
                this.props.onChangeState(true);
            }
        }catch(error){
            console.error(error);
        }
    }

    /**
     * 取串口值
     */
    getPort(){
        try{
            const that = this;
            var list2 = (SEP.RobotManage.getPortList()).then(function (list) {
                if(!list) {return [];}
                let data = that.state.data ;
                data.portlist = list ;
                that.setState({
                    data : data
                });
            });
        }catch (error){
            console.error(error);
        }
    }


    testSetPort () {
        SEP.RobotManage.addByPort('/dev/tty.wchusbserial1420');
    };
    testSound() {
        //const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
        //SEP.RobotManage.getCurrentRobot().writeBuffer(buffer3);
        //SEP.RobotManage.getCurrentRobot().write('52420b0413fa052a03e8ca');

        // (SEP.RobotManage.getCurrentRobot().request(true,'52420b0413fa052a03e8ca')).then(function (data) {
        //     console.log('A SEP.testSend:then=',data);
        // });

        robot.setBuzzer(-6, 567, 500,false).then(function (data) {
                 console.log('B SEP.testSend:then=',data);
         });
    };
}

GsConnect.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeConnect());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsConnect);
