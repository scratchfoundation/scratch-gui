const React = require('react');
const VM = require('scratch-vm');

const VMManager = require('../lib/vm-manager');

const Blocks = require('./blocks');
const GUIComponent = require('../components/gui');
const GreenFlag = require('./green-flag');
const SpriteSelector = require('./sprite-selector');
const Stage = require('./stage');
const StopAll = require('./stop-all');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        this.vmManager = new VMManager(this.props.vm);
    }
    componentDidMount () {
        this.vmManager.attachKeyboardEvents();
        this.props.vm.loadProject(this.props.projectData);
        this.props.vm.start();
    }
    componentWillUnmount () {
        this.vmManager.detachKeyboardEvents();
        this.props.vm.stopAll();
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.projectData !== nextProps.projectData) {
            this.props.vm.loadProject(nextProps.projectData);
        }
    }
    render () {
        return (
            <GUIComponent>
                <GreenFlag vm={this.props.vm} />
                <StopAll vm={this.props.vm} />
                <Stage vm={this.props.vm} />
                <SpriteSelector vm={this.props.vm} />
                <Blocks
                    options={{
                        media: this.props.basePath + 'static/blocks-media/'
                    }}
                    vm={this.props.vm}
                />
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    basePath: React.PropTypes.string,
    projectData: React.PropTypes.string,
    vm: React.PropTypes.object,
};

GUI.defaultProps = {
    basePath: '/',
    vm: new VM()
};

module.exports = GUI;
