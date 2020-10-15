import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import styles from './description.css';

const Description = ({
    instructions,
    credits
}) => (
    instructions || credits ? (
        <div className={styles.description}>
            {instructions ? (
                <div>
                    <div className={styles.header}>
                        <FormattedMessage
                            defaultMessage="Instructions"
                            description="Header for instructions section of description"
                            id="tw.home.instructions"
                        />
                    </div>
                    {instructions}
                </div>
            ) : null}
            {instructions && credits ? (
                <div className={styles.divider} />
            ) : null}
            {credits ? (
                <div>
                    <div className={styles.header}>
                        <FormattedMessage
                            defaultMessage="Notes and Credits"
                            description="Header for notes and credits section of description"
                            id="tw.home.credit"
                        />
                    </div>
                    {credits}
                </div>
            ) : null}
        </div>
    ) : null);

Description.propTypes = {
    instructions: PropTypes.string,
    credits: PropTypes.string
};

export default Description;
