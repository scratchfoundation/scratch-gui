const React = require('react');

const GUIComponent = function (props) {
    const {
        children,
        ...componentProps
    } = props;
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
            {...componentProps}
        >
            {children}
        </div>
    );
};

GUIComponent.propTypes = {
    children: React.PropTypes.node
};

module.exports = GUIComponent;
