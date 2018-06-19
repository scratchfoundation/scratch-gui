import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import DragConstants from '../../lib/drag-constants';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import styles from './backpack.css';

// TODO make sprite selector item not require onClick
const noop = () => {};

const dragTypeMap = {
    costume: DragConstants.BACKPACK_COSTUME,
    sound: DragConstants.BACKPACK_SOUND,
    code: DragConstants.BACKPACK_CODE,
    sprite: DragConstants.BACKPACK_SPRITE
};

const Backpack = ({contents, error, expanded, loading, onToggle}) => (
    <div className={styles.backpackContainer}>
        <div
            className={styles.backpackHeader}
            onClick={onToggle}
        >
            {onToggle ? (
                <FormattedMessage
                    defaultMessage="Backpack"
                    description="Button to open the backpack"
                    id="gui.backpack.header"
                />
            ) : (
                <ComingSoonTooltip
                    place="top"
                    tooltipId="backpack-tooltip"
                >
                    <FormattedMessage
                        defaultMessage="Backpack"
                        description="Button to open the backpack"
                        id="gui.backpack.header"
                    />
                </ComingSoonTooltip>
            )}
        </div>
        {expanded ? (
            <div className={styles.backpackList}>
                {error ? (
                    <div className={styles.statusMessage}>
                        <FormattedMessage
                            defaultMessage="Error loading backpack"
                            description="Error backpack message"
                            id="gui.backpack.errorBackpack"
                        />
                    </div>
                ) : (
                    loading ? (
                        <div className={styles.statusMessage}>
                            <FormattedMessage
                                defaultMessage="Loading..."
                                description="Loading backpack message"
                                id="gui.backpack.loadingBackpack"
                            />
                        </div>
                    ) : (
                        contents.length > 0 ? (
                            <div className={styles.backpackListInner}>
                                {contents.map(item => (
                                    <SpriteSelectorItem
                                        className={styles.backpackItem}
                                        costumeURL={item.thumbnailUrl}
                                        details={item.name}
                                        dragPayload={item}
                                        dragType={dragTypeMap[item.type]}
                                        key={item.id}
                                        name={item.type}
                                        selected={false}
                                        onClick={noop}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.statusMessage}>
                                <FormattedMessage
                                    defaultMessage="Backpack is empty"
                                    description="Empty backpack message"
                                    id="gui.backpack.emptyBackpack"
                                />
                            </div>
                        )
                    )
                )}
            </div>
        ) : null}
    </div>
);

Backpack.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string
    })),
    error: PropTypes.bool,
    expanded: PropTypes.bool,
    loading: PropTypes.bool,
    onToggle: PropTypes.func
};

Backpack.defaultProps = {
    contents: [],
    expanded: false,
    loading: false,
    onToggle: null
};

export default Backpack;
