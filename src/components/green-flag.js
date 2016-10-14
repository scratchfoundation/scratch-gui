const bindAll = require('lodash.bindall');
const React = require('react');

class GreenFlag extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onClick']);
    }
    onClick (e) {
        e.preventDefault();
        this.props.vm.greenFlag();
    }
    render () {
        return (
            <div
                className="scratch-green-flag"
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 440,
                    width: 50
                }}
            >
                <button onClick={this.onClick}>{this.props.title}</button>
            </div>
        );
    }
}

GreenFlag.propTypes = {
    title: React.PropTypes.string,
    vm: React.PropTypes.object
};

GreenFlag.defaultProps = {
    title: 'Go'
};

module.exports = GreenFlag;
