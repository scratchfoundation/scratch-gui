const React = require('react');

const Blocks = require('./blocks');
const Renderer = require('scratch-render');
const Stage = require('./stage');
const Toolbox = require('./toolbox');
const VM = require('scratch-vm');
const VMManager = require('../lib/vm-manager');

class GUI extends React.Component {
    constructor (props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.onReceiveWorkspace = this.onReceiveWorkspace.bind(this);
        this.state = {};
    }
    componentDidMount () {
        this.setState({
            toolbox: this.toolbox
        });
    }
    onReceiveWorkspace (workspace) {
        this.workspace = workspace;
        this.workspace.addChangeListener(this.props.vm.blockListener);
        VMManager.attachWorkspace(this.props.vm, this.workspace);
        VMManager.attachMouseEvents(this.props.vm, this.stage);
        VMManager.attachKeyboardEvents(this.props.vm);
        this.renderer = new Renderer(this.stage);
        this.props.vm.attachRenderer(this.renderer);
        this.props.vm.createEmptyProject();
        this.props.vm.start();
    }
    animate () {
        this.props.vm.animationFrame();
        requestAnimationFrame(this.animate);
    }
    render () {
        return (
            <div className="scratch-gui">
                <Stage stageRef={stage => this.stage = stage} />
                <Toolbox toolboxRef={toolbox => this.toolbox = toolbox} />
                <Blocks
                    options={{
                        toolbox: this.state.toolbox
                    }}
                    vm={this.props.vm}
                    onReceiveWorkspace={this.onReceiveWorkspace}
                />
            </div>
        );
    }
}

GUI.propTypes = {
    vm: React.PropTypes.object
};

GUI.defaultProps = {
    vm: new VM()
};

module.exports = GUI;
