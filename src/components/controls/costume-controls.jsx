import React from 'react'
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Edit from './edit.svg';
import Paint from './paint.svg';
import Plus from './plus.svg';

import styles from './controls.css';

const ControlItem = props => (
    <div style={{marginRight: '4%'}}>
        {props.children}
    </div>
)

const CostumeControl = props => {

    const {
        addCostume,
        openLibrary,
        editCostume
    } = props

    return (
        <div style={{display: 'flex', direction: 'row', marginTop: 15}}>
            <ControlItem>
                <div onClick={openLibrary}>
                    <img
                        className={styles.costumeIcon}
                        src={Plus}
                    />
                    {/* Library */}
                </div>
            </ControlItem>
            <ControlItem>
                <div onClick={addCostume}>
                    <img
                        className={styles.costumeIcon}
                        src={Edit} />
                    {/* Add */}
                </div>

            </ControlItem>
            <ControlItem>
                <div onClick={editCostume}>
                    <img
                        className={styles.costumeIcon}
                        src={Paint} />
                    {/* Edit */}
                </div>
            </ControlItem>
        </div>
    )
}

CostumeControl.propTypes = {
    addCostume: PropTypes.func,
    openLibrary: PropTypes.func,
    editCostume: PropTypes.func
}

export default injectIntl(CostumeControl);
