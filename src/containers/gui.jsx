const React = require('react');
const VM = require('scratch-vm');

const vmListenerHOC = require('../lib/vm-listener-hoc.jsx');

const GUIComponent = require('../components/gui/gui.jsx');

class GUI extends React.Component {
    componentDidMount () {
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.start();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    componentWillUnmount () {
        this.props.vm.stopAll();
    }
    render () {
        const {
            projectData, // eslint-disable-line no-unused-vars
            vm,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                vm={vm}
                {...componentProps}
            />
        );
    }
}

GUI.propTypes = {
    ...GUIComponent.propTypes,
    projectData: React.PropTypes.string,
    vm: React.PropTypes.instanceOf(VM)
};

GUI.defaultProps = GUIComponent.defaultProps;

module.exports = vmListenerHOC(GUI);
