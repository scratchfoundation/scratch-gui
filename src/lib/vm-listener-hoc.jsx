const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const {connect} = require('react-redux');

const targets = require('../reducers/targets');

/*
 * Higher Order Component to manage events emitted by the VM
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
const vmListenerHOC = function (WrappedComponent) {
    class VMListener extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleKeyDown',
                'handleKeyUp'
            ]);
            // We have to start listening to the vm here rather than in
            // componentDidMount because the HOC mounts the wrapped component,
            // so the HOC componentDidMount triggers after the wrapped component
            // mounts.
            // If the wrapped component uses the vm in componentDidMount, then
            // we need to start listening before mounting the wrapped component.
            this.props.vm.on('targetsUpdate', this.props.onTargetsUpdate);
            this.props.vm.on('SPRITE_INFO_REPORT', this.props.onSpriteInfoReport);
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
            // Don't capture keys intended for Blockly inputs.
            if (e.target !== document && e.target !== document.body) return;

            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: true
            });

            // Don't stop browser keyboard shortcuts
            if (e.metaKey || e.altKey || e.ctrlKey) return;

            e.preventDefault();
        }
        handleKeyUp (e) {
            // Always capture up events,
            // even those that have switched to other targets.
            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                isDown: false
            });

            // E.g., prevent scroll.
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
                onSpriteInfoReport,
                onTargetsUpdate,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return <WrappedComponent {...props} />;
        }
    }
    VMListener.propTypes = {
        attachKeyboardEvents: React.PropTypes.bool,
        onKeyDown: React.PropTypes.func,
        onKeyUp: React.PropTypes.func,
        onSpriteInfoReport: React.PropTypes.func,
        onTargetsUpdate: React.PropTypes.func,
        vm: React.PropTypes.instanceOf(VM).isRequired
    };
    VMListener.defaultProps = {
        attachKeyboardEvents: true,
        vm: new VM()
    };
    const mapStateToProps = () => ({});
    const mapDispatchToProps = dispatch => ({
        onTargetsUpdate: data => {
            dispatch(targets.updateEditingTarget(data.editingTarget));
            dispatch(targets.updateTargets(data.targetList));
        },
        onSpriteInfoReport: spriteInfo => {
            dispatch(targets.updateTarget(spriteInfo));
        }
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMListener);
};

module.exports = vmListenerHOC;
