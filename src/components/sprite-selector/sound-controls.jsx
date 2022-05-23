import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const ControlItem = props => (
    <div style={{marginRight: '4%'}}>
        {props.children}
    </div>
)

const CostumeControl = props => {

    return (
        <div style={{display: 'flex', direction: 'row'}}>
            <ControlItem>
                <button>Add</button>
            </ControlItem>
            <ControlItem>
                <button>Edit</button>
            </ControlItem>
        </div>
    )
}

export default injectIntl(CostumeControl);
