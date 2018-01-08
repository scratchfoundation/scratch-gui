import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import {connect} from 'react-redux';

import {updateEditingTarget, updateTargets} from '../reducers/targets';
import {updateMonitors} from '../reducers/monitors';

/*
 * 管理由 VM 发出事件的高阶组件 (Higher Order Component to manage events emitted by the VM)
 * @param {React.Component} WrappedComponent 用于管理 VM 事件的组件 (component to manage VM events for)
 * @returns {React.Component} 连接组件与 VM 事件绑定到 redux (connected component with vm events bound to redux)
 */
const vmListenerHOC = function (WrappedComponent) {
    class VMListener extends React.Component {
        constructor (props) {
            super(props);
            // 手动绑定按键处理方法
            bindAll(this, [
                'handleKeyDown',
                'handleKeyUp'
            ]);
            // 必须在这里开始监听,而不是在 componentDidMount 中.因为 HOC 挂载了 "包装组件",
            // 所以 HOC 的 componentDidMount 在 "包装组件" 挂载后才会被触发.
            // 如果 "包装组件" 在 componentDidMount 中使用了 VM, 就要在 "包装组件" 挂载之前监听
            // We have to start listening to the vm here rather than in
            // componentDidMount because the HOC mounts the wrapped component,
            // so the HOC componentDidMount triggers after the wrapped component
            // mounts.
            // If the wrapped component uses the vm in componentDidMount, then
            // we need to start listening before mounting the wrapped component.
            this.props.vm.on('targetsUpdate', this.props.onTargetsUpdate);
            this.props.vm.on('MONITORS_UPDATE', this.props.onMonitorsUpdate);

        }
        componentDidMount () {
            if (this.props.attachKeyboardEvents) {
                document.addEventListener('keydown', this.handleKeyDown);
                document.addEventListener('keyup', this.handleKeyUp);
            }
        }
        componentWillUnmount () {
            if (this.props.attachKeyboardEvents) {
                document.removeEventListener('keydown', this.handleKeyDown);
                document.removeEventListener('keyup', this.handleKeyUp);
            }
        }
        handleKeyDown (e) {
            // 不要捕获用于 Blockly 的键 (Don't capture keys intended for Blockly inputs)
            if (e.target !== document && e.target !== document.body) return;

            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: true
            });

            // 不要停止浏览器的快捷键 (Don't stop browser keyboard shortcuts)
            if (e.metaKey || e.altKey || e.ctrlKey) return;

            e.preventDefault();
        }
        handleKeyUp (e) {
            // 总是捕获事件, 即使是切换到其他目标的事件.
            // Always capture up events, even those that have switched to other targets.
            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: false
            });

            // 阻止滚动事件 E.g., prevent scroll.
            if (e.target !== document && e.target !== document.body) {
                e.preventDefault();
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                attachKeyboardEvents,
                onKeyDown,
                onKeyUp,
                onMonitorsUpdate,
                onTargetsUpdate,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return <WrappedComponent {...props} />;
        }
    }
    // 定义类型检查器
    VMListener.propTypes = {
        attachKeyboardEvents: PropTypes.bool,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onMonitorsUpdate: PropTypes.func,
        onTargetsUpdate: PropTypes.func,
        vm: PropTypes.instanceOf(VM).isRequired
    };
    VMListener.defaultProps = {
        attachKeyboardEvents: true
    };
    const mapStateToProps = state => ({
        vm: state.vm
    });
    const mapDispatchToProps = dispatch => ({
        onTargetsUpdate: data => {
            dispatch(updateEditingTarget(data.editingTarget));
            dispatch(updateTargets(data.targetList));
        },
        onMonitorsUpdate: monitorList => {
            dispatch(updateMonitors(monitorList));
        }
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMListener);
};

export default vmListenerHOC;
