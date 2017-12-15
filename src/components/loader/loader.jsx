import React from 'react';
import {FormattedMessage} from 'react-intl';
import styles from './loader.css';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';

const LoaderComponent = () => {
    const messages = [
        {
            message: (
                <FormattedMessage
                    defaultMessage="Creating blocks …"
                    description="One of the loading messages"
                    id="gui.loader.message1"
                />
            ),
            weight: 50
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Loading sprites …"
                    description="One of the loading messages"
                    id="gui.loader.message2"
                />
            ),
            weight: 50
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Loading sounds …"
                    description="One of the loading messages"
                    id="gui.loader.message3"
                />
            ),
            weight: 50
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Loading extensions …"
                    description="One of the loading messages"
                    id="gui.loader.message4"
                />
            ),
            weight: 50
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Creating blocks …"
                    description="One of the loading messages"
                    id="gui.loader.message1"
                />
            ),
            weight: 20
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Herding cats …"
                    description="One of the loading messages"
                    id="gui.loader.message5"
                />
            ),
            weight: 1
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Transmitting nanos …"
                    description="One of the loading messages"
                    id="gui.loader.message6"
                />
            ),
            weight: 1
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Inflating gobos …"
                    description="One of the loading messages"
                    id="gui.loader.message7"
                />
            ),
            weight: 1
        },
        {
            message: (
                <FormattedMessage
                    defaultMessage="Preparing emojiis …"
                    description="One of the loading messages"
                    id="gui.loader.message8"
                />
            ),
            weight: 1
        }
    ];

    let message;
    const sum = messages.reduce((acc, m) => acc + m.weight, 0);
    let rand = sum * Math.random();
    for (let i = 0; i < messages.length; i++) {
        rand -= messages[i].weight;
        if (rand <= 0) {
            message = messages[i].message;
            break;
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.blockAnimation}>
                    <img
                        className={styles.topBlock}
                        src={topBlock}
                    />
                    <img
                        className={styles.middleBlock}
                        src={middleBlock}
                    />
                    <img
                        className={styles.bottomBlock}
                        src={bottomBlock}
                    />
                </div>
                <h1 className={styles.title}>
                    <FormattedMessage
                        defaultMessage="Loading Project"
                        description="Main loading message"
                        id="gui.loader.headline"
                    />
                </h1>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default LoaderComponent;
