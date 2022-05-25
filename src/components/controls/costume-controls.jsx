import React from 'react'
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const ControlItem = props => (
    <div style={{marginRight: '4%'}}>
        {props.children}
    </div>
)

const CostumeControl = props => {

    const {
        addCostume,
        openLibrary
    } = props

    return (
        <div style={{display: 'flex', direction: 'row'}}>
            <ControlItem>
                <button onClick={openLibrary}>Library</button>
            </ControlItem>
            <ControlItem>
                <button onClick={addCostume}>Add</button>
            </ControlItem>
            <ControlItem>
                <button>Edit</button>
            </ControlItem>
        </div>
    )
}

CostumeControl.propTypes = {
    addCostume: PropTypes.func,
    openLibrary: PropTypes.func
}

export default injectIntl(CostumeControl);
