import PropTypes from 'prop-types';
import React from 'react';

import styles from './select.css';

const Select = props => (
    <select autoFocus={props.autofocus} className={styles.variableNameTextInput} onChange={props.onChange}>
        {
            props.data.map((element, i) => {

                // Looks what values have to be starred and what values haven't
                let elementValue = element.value;
                if (props.starred !== null && props.starred.length) {
                    const star = props.starred.filter(s => s.id === element.id);
                    elementValue = (star === null || !star.length) ? elementValue : `* ${elementValue} *`;
                }
                i += 1;
                return(<option key={i} value={element.id}>{elementValue}</option>);
            })
        }
    </select>
);

Select.propTypes = {
    autofocus: PropTypes.bool,
    data: PropTypes.array,
    starred: PropTypes.array,
    onChange: PropTypes.func
};

Select.defaultProps = {
    autofocus: true,
    data: [],
    starred: []
};

export default Select;
