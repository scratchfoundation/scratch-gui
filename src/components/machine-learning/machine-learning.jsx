import React from 'react';
import PropType from 'prop-types';
import bindAll from 'lodash.bindall';
import Draggable from 'react-draggable';

import MachineLearningItem from './index.jsx';
import styles from './machine-learning.css';
import CloseButton from '../close-button/close-button.jsx';

class MachineLearningComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDragStart',
            'handleControlledDrag'
        ]);
        this.state = {
            controlledPosition: {
                x: 0,
                y: 0
            }
        };
    }

    shouldComponentUpdate () {
        if (!this.props.isMini && this.props.isHidden) {
            this.setState({
                controlledPosition: {
                    x: 0,
                    y: 0
                }
            });
        }
        return true;
    }

    handleDragStart () {
        if (this.props.isMini) return true;
        return false;
    }

    handleControlledDrag (e, position) {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    }

    render () {
        const {controlledPosition} = this.state;
        
        return (
            <div>
                {this.props.isMini || this.props.isHidden ? null : <div className={styles.machineBg} />}
                <Draggable
                    position={controlledPosition}
                    onDrag={this.handleControlledDrag}
                    onStart={this.handleDragStart}
                >
                    <div
                        style={{display: this.props.isHidden ? 'none' : 'block'}}
                        className={`${styles.container} ${this.props.isMini ? styles.containerMini : ''}`}
                    >
                        <div className={`${styles.header} ${this.props.isMini ? styles.headerMini : ''}`}>
                            {this.props.isMini ? (<h3>机器识别</h3>) : (<h2>训练模型</h2>)}
                            <CloseButton
                                className={`${styles.machineClose} ${this.props.isMini ? styles.closeSmall : ''}`}
                                onClick={this.props.onCancel}
                            />
                        </div>
                        <MachineLearningItem
                            isMini={this.props.isMini}
                            onAddBlock={this.props.onAddBlock}
                        />
                        <div
                            id="machinemask"
                            className={styles.machineBoxerMasker}
                        >
                            <h1>机器启动中，请稍后。。。</h1>
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
}

MachineLearningComponent.propTypes = {
    isMini: PropType.bool,
    isHidden: PropType.bool,
    onCancel: PropType.func,
    onAddBlock: PropType.func
};

export default MachineLearningComponent;
