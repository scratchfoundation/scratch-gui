const React = require('react');

const styles = require('./gui.css');

const GUIComponent = props => (
    <div className={styles.gui}>
        {props.children}
    </div>
);

GUIComponent.propTypes = {
    children: React.PropTypes.node
};

module.exports = GUIComponent;
