import React from 'react';
import {FormattedMessage} from 'react-intl';
import styles from './loader.css';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';
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
                defaultMessage="Preparing emojis …"
                description="One of the loading messages"
                id="gui.loader.message8"
            />
        ),
        weight: 1
    }
];

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messageNumber: 0
        };
    }
    componentDidMount () {
        this.chooseRandomMessage();

        // Start an interval to choose a new message every 5 seconds
        this.intervalId = setInterval(() => {
            this.chooseRandomMessage();
        }, 5000);
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    chooseRandomMessage () {
        let messageNumber;
        const sum = messages.reduce((acc, m) => acc + m.weight, 0);
        let rand = sum * Math.random();
        for (let i = 0; i < messages.length; i++) {
            rand -= messages[i].weight;
            if (rand <= 0) {
                messageNumber = i;
                break;
            }
        }
        this.setState({messageNumber});
    }
    render () {
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
                    <div className={styles.messageContainerOuter}>
                        <div
                            className={styles.messageContainerInner}
                            style={{transform: `translate(0, -${this.state.messageNumber * 25}px)`}}
                        >
                            {messages.map((m, i) => (
                                <div
                                    className={styles.message}
                                    key={i}
                                >
                                    {m.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoaderComponent;
