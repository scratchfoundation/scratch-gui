/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../index.css';

export default class InputSectionComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {}

    render () {
        return (
            <div
                id="input-section"
                className={`${styles.section} ${styles['section--disabled']} ${styles.input} ${styles['section--input']}`}
            >
                <h2
                    style={{display: this.props.isMini ? 'none' : 'block'}}
                    className={styles.section__title}
                ><span>输入</span></h2>
                <div className={styles.section__container}>
                    <div
                        id="input__media"
                        className={styles.input__media}
                    />
                    <a
                        href=""
                        className={styles.input__media__flip}
                        id="input__media__flip"
                    />
                    <div id="small_result">
                        <div className={styles.machine__meter}>
                            <div
                                id="small_percent"
                                className={styles.machine__value}
                                style={{background: '#2baa5e'}}
                            >
                                <div
                                    id="small_percent_text"
                                    className={styles.machine__percentage}
                                    style={{color: '#ffffff'}}
                                >0%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InputSectionComponent.propTypes = {
    isMini: PropTypes.bool
}
