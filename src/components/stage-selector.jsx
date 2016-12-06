const React = require('react');

const CostumeCanvas = require('./costume-canvas.jsx');

const style = {
    base: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 72,
        border: '1px solid',
        borderColor: 'transparent'
    },
    selected: {
        borderColor: 'black'
    }
};

const StageSelector = props => (
    <div
        className="scratch-stage-selector"
        style={Object.assign({},
            style.base,
            props.selected ? style.selected : {}
        )}
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
