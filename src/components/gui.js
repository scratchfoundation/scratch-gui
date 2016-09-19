const React = require('react');
const VM = require('scratch-vm');
const Blocks = require('./blocks');
const Toolbox = require('./toolbox');

class GUI extends React.Component {
    constructor (props) {
        this.state = {};
    }
    componentDidMount () {
        this.setState({toolbox: this._toolbox});
    }
    render () {
        return (
            <div className="scratch-gui">
                <Toolbox toolboxRef={(toolbox) => this._toolbox = toolbox} />
                <Blocks
                    options={{
                        toolbox: this.state.toolbox
                    }}
                    vm={this.props.vm}
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
