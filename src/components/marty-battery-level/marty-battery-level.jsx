import React from 'react';
import styles from './marty-battery-level.css';

class MartyBatteryLevel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {batteryPercent: 0};
        this.onBatteryPerecentChange = this.onBatteryPerecentChange.bind(this);
        // eslint-disable-next-line no-undef
        mv2.addEventListener('onBattRemainCapacityPercentChange', this.onBatteryPerecentChange);
    }

    componentWillUnmount () {
        // eslint-disable-next-line no-undef
        mv2.removeEventListener('onBattRemainCapacityPercentChange', this.onBatteryPerecentChange);
    }

    onBatteryPerecentChange (event) {
        this.setState({batteryPercent: event.battRemainCapacityPercent});
    }

    getBorderColor (batteryPercent) {
        if (batteryPercent >= 70) {
            return 'black';
        }
        if (batteryPercent >= 30) {
            return 'black';
        }
        return 'rgb(255,69,0)';

    }

    getFillColor (batteryPercent) {
        if (batteryPercent >= 70) {
            return 'lime';
        }
        if (batteryPercent >= 30) {
            return 'rgb(255,215,0)';
        }
        return 'red';
    }

    render () {
        const {batteryPercent} = this.state;
        const borderColor = this.getBorderColor(batteryPercent);
        const fillColor = this.getFillColor(batteryPercent);
        const flash = batteryPercent < 20 ? styles.batteryFlash : '';
        return (
            <div
                className={`${flash} ${styles.batteryContainer}`}
            >
                <div
                    className={styles.batteryCap}
                    style={{backgroundColor: borderColor}}
                />
                <div
                    className={styles.batteryCylinder}
                    style={{borderColor: borderColor}}
                >
                    <div
                        style={{backgroundColor: fillColor, width: '100%', height: `${Math.round(batteryPercent)}%`}}
                    />
                </div>
            </div>);
    }
}

export default MartyBatteryLevel;
