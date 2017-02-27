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
            <div className={styles.header}>
                <div className={styles.headerTitle}>Stage</div>
            </div>
            <div className={styles.body}>
                <div
                    className={classNames({
                        [styles.flexWrapper]: true,
                        [styles.isSelected]: selected
                    })}
                >
                    {url ? (
                        <CostumeCanvas
                            className={styles.costumeCanvas}
                            height={44}
                            url={url}
                            width={56}
                        />
                    ) : null}
                    <div className={styles.label}>Backdrops</div>
                    <div className={styles.count}>{backdropCount}</div>
                </div>
                
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
