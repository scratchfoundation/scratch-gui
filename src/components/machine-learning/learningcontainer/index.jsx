import React from 'react';
import styles from '../index.css';

export default class LearningContainerComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        let SVG = `
            <?xml version="1.0" encoding="utf-8"?>
            <svg version="1.1" class="wires-svg" id="Layer_left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 323 68.8" style="enable-background:new 0 0 323 68.8;" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:none;stroke-miterlimit:10;}
                </style>
            </svg>
        `
        const wiresLeft = document.querySelector("#wires__left");
        wiresLeft.innerHTML = SVG;
        const wiresRight = document.querySelector("#wires__right");
        SVG = `
            <?xml version="1.0" encoding="utf-8"?>
            <svg version="1.1" class="wires-svg" id="Layer_right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 323 68.8" style="enable-background:new 0 0 323 68.8;" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:none;stroke-miterlimit:10;}
                </style>
            </svg>
        `
        wiresRight.innerHTML = SVG;
        
    }

    render () {
        return (
            <div>
                <h2 className={`${styles.section__title} ${styles["section__title--learning"]}`}>
                    <span>样例特征</span>
                </h2>
                <div id="learning-container" className={styles.learning_container}>
                    <div id="wires__left" className={`${styles.wires} ${styles["wires--disabled"]} ${styles["wires--left"]}`} >
                        {/* { eval(SVG) } */}
                    </div>
                    <div id="learning-section" className={`${styles.section} ${styles.learning} ${styles["section--learning"]}`}>
                        <div id="section__container" className={styles.section__container} />
                    </div>
                    <div id="wires__right" className={`${styles.wires} ${styles["wires--disabled"]} ${styles["wires--right"]}`} >
                        {/* { eval(SVG) } */}
                    </div>
                </div>
            </div>
        );
    }
}
