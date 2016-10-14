const bindAll = require('lodash.bindall');
const React = require('react');

class StopAll extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onClick']);
    }
    onClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        return (
            <div
                className="scratch-stop-all"
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 400,
                    width: 50
                }}
            >
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
