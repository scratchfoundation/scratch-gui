const PropTypes = require('prop-types');
const React = require('react');
const VM = require('scratch-vm');
const bindAll = require('lodash.bindall');

const vmListenerHOC = require('../lib/vm-listener-hoc.jsx');

const GUIComponent = require('../components/gui/gui.jsx');

const {connect} = require('react-redux');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTabSelect'
        ]);
        this.state = {tabIndex: 0};
    }
    componentDidMount () {
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.setCompatibilityMode(true);
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
    handleTabSelect (tabIndex) {
        this.setState({tabIndex});
    }
    render () {
        const {
            projectData, // eslint-disable-line no-unused-vars
            vm,
            editingTarget,
            sprites,
            ...componentProps
        } = this.props;
        
        const costumeTabText = editingTarget && sprites[editingTarget] ? 'Costumes' : 'Backdrops';
        
        return (
            <GUIComponent
                costumeTabText={costumeTabText}
                tabIndex={this.state.tabIndex}
                vm={vm}
                onTabSelect={this.handleTabSelect}
                {...componentProps}
            />
        );
    }
}

GUI.propTypes = {
    ...GUIComponent.propTypes,
    editingTarget: PropTypes.string,
    projectData: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costumes: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired
            }))
        })
    }),
    vm: PropTypes.instanceOf(VM)
};

GUI.defaultProps = GUIComponent.defaultProps;

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites
});

module.exports = vmListenerHOC(connect(mapStateToProps)(GUI));
