const React = require('react');
const VM = require('scratch-vm');
const Blocks = require('./blocks');
const Toolbox = require('./toolbox');

class GUI extends React.Component {
    render () {
        return (
            <div className="scratch-gui">
                <Toolbox ref={toolbox => this.toolbox = toolbox} />
                <Blocks
                    options={{
                        toolbox: this.toolbox
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
