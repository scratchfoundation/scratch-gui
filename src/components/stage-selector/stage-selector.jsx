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
            className={styles.stageSelector}
            onClick={onClick}
            {...componentProps}
        >
            <div
                className={classNames({
                    [styles.border]: true,
                    [styles.isSelected]: selected
                })}
            />
            <div className={styles.header}>
                <div className={styles.title}>Stage</div>
                <div className={styles.count}>{backdropCount}</div>
                <div className={styles.label}>Backdrops</div>
            </div>
            <div className={styles.body}>
                {url ? (
                    <CostumeCanvas
                        className={styles.costumeCanvas}
                        height={44}
                        url={url}
                        width={56}
                    />
                ) : null}
            </div>
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
