const React = require('react');

const CostumeCanvas = require('./costume-canvas.jsx');

const StageSelector = props => (
    <div
        className="scratch-stage-selector"
        style={{
            border: '1px solid',
            borderColor: props.selected ? 'black' : 'transparent'
        }}
        onClick={props.onClick}
    >
        <div>Stage</div>
        <div>Backgrounds</div>
        <div>{props.backdropCount}</div>
        <hr />
        {props.url ? (
            <CostumeCanvas
                height={43}
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
