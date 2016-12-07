const React = require('react');

const styles = require('./blocks.css');

class BlocksComponent extends React.Component {
    render () {
        const {
            componentRef,
            ...props
        } = this.props;
        return (
            <div
                className={styles.blocks}
                ref={componentRef}
                {...props}
            />
        );
    }
}

BlocksComponent.propTypes = {
    componentRef: React.PropTypes.func
};

module.exports = BlocksComponent;
