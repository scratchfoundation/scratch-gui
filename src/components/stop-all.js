const React = require('react');

class StopAllComponent extends React.Component {
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
                <button onClick={this.props.onClick}>{this.props.title}</button>
            </div>
        );
    }
}

StopAllComponent.propTypes = {
    title: React.PropTypes.string,
};

StopAllComponent.defaultProps = {
    title: 'Stop'
};

module.exports = StopAllComponent;
