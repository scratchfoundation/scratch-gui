import AudioEngine from 'scratch-audio';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {openExtensionLibrary} from '../reducers/modals.js';

import vmListenerHOC from '../lib/vm-listener-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTabSelect'
        ]);
        this.state = {tabIndex: 0};
    }

    /**
     * 组件加载完成时,初始化并启动 scratch-vm 虚拟机
     */
    componentDidMount () {
        this.audioEngine = new AudioEngine(); // 新建声音引擎
        this.props.vm.attachAudioEngine(this.audioEngine); // 挂载声音引擎
        this.props.vm.loadProject(this.props.projectData); // 加载项目
        this.props.vm.setCompatibilityMode(true); // 兼容模式
        this.props.vm.start(); // 开启 vm
    }

    /**
     * 修改组件 props 前触发事件,判断是否需要加载新项目
     * @param {React.props} nextProps 改变后的 props
     */
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }

    /**
     * 组件卸载时,停止虚拟机 vm
     */
    componentWillUnmount () {
        this.props.vm.stopAll();
    }

    /**
     * 切换标签的处理方法
     * @param {PropTypes.number} tabIndex 标签序号(Blocks, Costumes, Sounds)
     */
    handleTabSelect (tabIndex) {
        this.setState({tabIndex});
    }

    render () {
        // 从组件的 props 属性中导入一个方法和两个变量
        const {
            children,
            projectData, // eslint-disable-line no-unused-vars
            vm,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                enableExtensions={window.location.search.includes('extensions')}
                tabIndex={this.state.tabIndex}
                vm={vm}
                onTabSelect={this.handleTabSelect}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

// 数据类型验证
GUI.propTypes = {
    ...GUIComponent.propTypes,
    feedbackFormVisible: PropTypes.bool,
    previewInfoVisible: PropTypes.bool,
    projectData: PropTypes.string,
    vm: PropTypes.instanceOf(VM)
};

// 设置 GUI 默认 props 值为 GUIComponent 的默认 props
GUI.defaultProps = GUIComponent.defaultProps;

// 将 state 中对象分别绑定到 props 上
const mapStateToProps = state => ({
    feedbackFormVisible: state.modals.feedbackForm,
    previewInfoVisible: state.modals.previewInfo
});

// 将 action 的 onExtensionButtonClick 方法绑定到 props 上
const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary())
});

// 将 state 中的数据和 actions 方法绑定到 props 上
const ConnectedGUI = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GUI);

export default vmListenerHOC(ConnectedGUI);
