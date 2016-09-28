const React = require('react');

class StopAll extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        return (
            <div className="scratch-stop-all">
                <button onClick={this.onClick}>{this.props.title}</button>
            </div>
        );
    }
}

StopAll.propTypes = {
    title: React.PropTypes.string,
    vm: React.PropTypes.object
};

StopAll.defaultProps = {
    title: 'Stop'
};

module.exports = StopAll;
