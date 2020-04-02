import React from 'react';
import styles from '../index.css';

export default class OutputSectionComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {}

    render () {
        return (
            <div id="output-section" className={`${styles.section} ${styles["section--disabled"]} ${styles.output} ${styles["section--output"]}`} >
                <h2 className={styles.section__title}>
                    <span>输出</span>
                </h2>
                <div className={styles.section__container}>
                    <div className={styles.output__controls}>
                        <div id="TextOutput" className={`${styles.output_selector__option} ${styles["output_selector__option--selected"]}`}>
                            <h2>结果</h2>
                        </div>
                    </div>
                    <div className={`${styles.divider} ${styles.output__divider}`} />
                    <div id="output-player" className={styles.output__player} />
                </div>
            </div>
        );
    }
}
