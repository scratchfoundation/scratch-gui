const React = require('react');

class GUIComponent extends React.Component {
    render () {
        const {
            children,
            ...props
        } = this.props;
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
                {...props}
            >
                {children}
            </div>
        );
    }
}

GUIComponent.propTypes = {
    children: React.PropTypes.node
};

module.exports = GUIComponent;
