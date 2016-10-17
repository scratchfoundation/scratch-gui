const React = require('react');

class GUIComponent extends React.Component {
    render () {
        return (
            <div
                className="scratch-gui"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

module.exports = GUIComponent;
