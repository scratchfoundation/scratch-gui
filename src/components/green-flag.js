const React = require('react');

class GreenFlag extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick (e) {
        e.preventDefault();
        this.props.vm.greenFlag();
    }
    render () {
        return (
            <div className="scratch-green-flag">
                <button onClick={this.onClick}></button>
            </div>
        );
    }
}

GreenFlag.propTypes = {
    vm: React.PropTypes.object
};

module.exports = GreenFlag;
