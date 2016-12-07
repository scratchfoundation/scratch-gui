const classNames = require('classnames');
const React = require('react');

const CostumeCanvas = require('../costume-canvas/costume-canvas.jsx');
const styles = require('./stage-selector.css');

const StageSelector = props => (
    <div
        className={classNames({
            [styles.stageSelector]: true,
            [styles.isSelected]: props.selected
        })}
        onClick={props.onClick}
    >
        <div>Stage</div>
        <div>Backgrounds</div>
        <div>{props.backdropCount}</div>
        <hr />
        {props.url ? (
            <CostumeCanvas
                height={42}
                url={props.url}
                width={50}
            />
        ) : null}
    </div>
);

StageSelector.propTypes = {
    backdropCount: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    url: React.PropTypes.string
};

module.exports = StageSelector;
