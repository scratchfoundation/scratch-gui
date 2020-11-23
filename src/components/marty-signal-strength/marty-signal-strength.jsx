import React from 'react';
import styles from './marty-signal-strength.css';

class MartySignalStrength extends React.Component {
    constructor (props) {
        super(props);
        this.state = {rssi: 0};
        this.onRSSIChange = this.onRSSIChange.bind(this);
        // eslint-disable-next-line no-undef
        mv2.addEventListener('onRSSIChange', this.onRSSIChange);
    }

    componentWillUnmount () {
        // eslint-disable-next-line no-undef
        mv2.removeEventListener('onRSSIChange', this.onRSSIChange);
    }

    onRSSIChange (event) {
        this.setState({rssi: event.rssi});
    }

    render () {
        const {rssi} = this.state;
        const flash = rssi == 0 ? styles.signalFlash : '';
        return (
            <div
                className={`${flash} ${styles.signalStrengthContainer}`}
            >
                <div
                    className={styles.signalBar}
                    style={{backgroundColor: rssi >= -100 ? 'black' : 'lightgray', height: '20%'}}
                />
                <div
                    className={styles.signalBar}
                    style={{backgroundColor: rssi >= -80 ? 'black' : 'lightgray', height: '40%'}}
                />
                <div
                    className={styles.signalBar}
                    style={{backgroundColor: rssi >= -70 ? 'black' : 'lightgray', height: '60%'}}
                />
                <div
                    className={styles.signalBar}
                    style={{backgroundColor: rssi >= -60 ? 'black' : 'lightgray', height: '80%'}}
                />
                <div
                    className={styles.signalBar}
                    style={{backgroundColor: rssi >= -50 ? 'black' : 'lightgray', height: '100%'}}
                />
            </div>
        );
    }
}

export default MartySignalStrength;
