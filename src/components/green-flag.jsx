const React = require('react');

class GreenFlagComponent extends React.Component {
    render () {
        const {
            onClick,
            title,
            ...props
        } = this.props;
        return (
            <div
                className="scratch-green-flag"
                style={{
                    position: 'absolute',
                    top: 380,
                    right: 440,
                    width: 50
                }}
                {...props}
            >
                <button onClick={onClick}>{title}</button>
            </div>
        );
    }
}

GreenFlagComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

GreenFlagComponent.defaultProps = {
    title: 'Go'
};

module.exports = GreenFlagComponent;
