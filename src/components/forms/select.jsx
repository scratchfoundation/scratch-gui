import PropTypes from 'prop-types';
import React from 'react';

import styles from './select.css';

const Select = props => (
    <select autoFocus={props.autofocus} className={styles.variableNameTextInput} onChange={props.onChange}>
        {
            props.data.map((element, i) => {
                i+=1
                return(<option key={i} value={element.id}>{element.value}</option>)
            })
        }
    </select>
);

Select.propTypes = {
    autofocus: PropTypes.bool,
    data: PropTypes.array,
    onChange: PropTypes.func
};

Select.defaultProps = {
    autofocus: true,
    data: []
};

export default Select;
