const React = require('react');

class GreenFlagComponent extends React.Component {
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
                <button onClick={this.props.onClick}>{this.props.title}</button>
            </div>
        );
    }
}

GreenFlagComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string,
};

GreenFlagComponent.defaultProps = {
    title: 'Go'
};

module.exports = GreenFlagComponent;
