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

const SoundControl = props => {

    const {
        addSound,
        openLibrary,
        editSound
    } = props

    return (
        <div style={{display: 'flex', direction: 'row', marginTop: 15}}>
            <ControlItem>
                <div onClick={addSound}>
                    <img
                        className={styles.costumeIcon}
                        src={Plus}
                    />
                </div>
            </ControlItem>
            <ControlItem>
                <div onClick={editSound}>
                    <img
                        className={styles.costumeIcon}
                        src={Edit} />
                </div>

            </ControlItem>
        </div>
    )
}

SoundControl.propTypes = {
    addSound: PropTypes.func,
    openLibrary: PropTypes.func,
    editSound: PropTypes.func
}

export default injectIntl(SoundControl);
