const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const CostumeCanvas = require('../costume-canvas/costume-canvas.jsx');
const styles = require('./stage-selector.css');

const StageSelector = props => {
    const {
        backdropCount,
        selected,
        url,
        onClick,
        ...componentProps
    } = props;
    return (
        <Box
            className={classNames({
                [styles.stageSelector]: true,
                [styles.isSelected]: selected
            })}
            onClick={onClick}
            {...componentProps}
        >
            <div className="header">Stage</div>
            <div>{backdropCount}<br />Backdrops</div>
            {url ? (
                <CostumeCanvas
                    height={42}
                    url={url}
                    width={50}
                />
            ) : null}
        </Box>
    );
};
StageSelector.propTypes = {
    backdropCount: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    url: React.PropTypes.string
};
module.exports = StageSelector;
