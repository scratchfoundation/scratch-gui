import React, {Component} from 'react';
import {Form, Input, Modal,message} from "antd";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {
    loginMenuOpen,
    closeLoginMenu
} from '../../reducers/menus';
import bindAll from "lodash.bindall";

const FormItem = Form.Item;

class LoginMenu extends Component {
    constructor(props) {
        super(props);
        bindAll(this,[
            'submitLogin',
            'cancelClick'
        ]);
    }
    submitLogin(e) {
        //阻止事件冒泡
        e.stopPropagation();

        this.props.form.validateFields((err, values)=>{
            if (err){
                message.error('提交有误');
            }  else  {
                console.log(values);
                this.props.closeLoginMenu();
            }
        });
    };

    cancelClick(e) {
        //阻止事件冒泡
        e.stopPropagation();
        this.props.closeLoginMenu();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 12},
        };
        return (
            <div>
                <Modal
                    title="登录"
                    visible={this.props.visible}
                    width="480px"
                    okText="登录"
                    cancelText="取消"
                    onOk={(e)=>this.submitLogin(e)}
                    onCancel={(e)=>this.cancelClick(e)}
                >
                    <Form layout="horizontal" {...formItemLayout} >
                        <FormItem label="用户名">
                            {
                                getFieldDecorator('userName',
                                    {
                                        initialValue: '',
                                        rules: [
                                            {required: true, message: '请输入用户名'}
                                        ]
                                    })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码">
                            {
                                getFieldDecorator('passWord',
                                    {
                                        initialValue: '',
                                        rules: [
                                            {required: true, message: '请输入密码'}
                                        ]
                                    })(
                                    <Input placeholder="请输入密码" type="password"/>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

LoginMenu.propTypes = {
    visible: PropTypes.bool,
    closeLoginMenu:PropTypes.func,
};
const mapDispatchToProps = dispatch =>({
    // closeLoginMenu:()=>dispatch(closeLoginMenu()),
});
const mapStateToProps = (state) => {
    return {
        // visible: loginMenuOpen(state),
    }
};

export default Form.create()(connect()(LoginMenu));
