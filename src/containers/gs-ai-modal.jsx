import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import GsAiComponent from '../components/gs-ai-modal/gs-ai-modal.jsx';
import lan from '../../mycode/language/Local'

import {
    closeMyai
} from '../reducers/modals';

class GsAiModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);
        this.butFlag = 0;
        this.state = {
            data :{log:[],msg:''}
        };
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    render() {
        return (
            <GsAiComponent
                onCancel={this.handleCancel.bind(this)}
                onChangeLanguage={this.handleChangeLanguage.bind(this)}
                onClick1={this.handleClick1.bind(this)}
                onClick2={this.handleClick2.bind(this)}
                data ={this.state.data}
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

    handleChangeLanguage(e){
        var v = e.target.value ;
        console.log('chang language:'+v );
    }

    handleClick1(e){
        console.log('handleClick1:' );
        if(this.butFlag == 1) return;
        try{
            this.butFlag =1 ;
            SEP.ai.startRecording('zh');
        }catch (error){
            console.error(error);
        }
    }

    handleClick2(e){
        console.log('handleClick2:' );
        if(this.butFlag == 2) return;
        try{
            this.butFlag = 2 ;
            SEP.ai.stopRecording();
        }catch (error){
            console.error(error);
        }
    }
}

GsAiModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeMyai());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsAiModal);
