import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import GsSettingComponent from '../components/gs-setting/gs-setting.jsx';
import lan from '../../mycode/language/Local'

import {
    closeSetting
} from '../reducers/modals';

class GsSettingModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCancel'
        ]);

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    render() {
        return (
            <GsSettingComponent
                onCancel={this.handleCancel.bind(this)}
                onChangeLanguage={this.handleChangeLanguage.bind(this)}
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
        lan.setData(v);
        location.reload();
    }

}

GsSettingModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeSetting());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GsSettingModal);
