const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteInfoComponent = require('../components/sprite-info/sprite-info.jsx');

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleChangeRotationStyle',
            'handleChangeX',
            'handleChangeY',
            'handleClickVisible',
            'handleClickNotVisible',
            'handleClickDraggable',
            'handleClickNotDraggable',
            'handleFlush',
            'handleKeyPress'
        ]);
        this.state = {
            name: null,
            x: null,
            y: null
        };
    }
    handleKeyPress (e) {
        if (e.key === 'Enter') {
            this.handleFlush();
            e.target.blur();
        }
    }
    handleFlush () {
        if (this.state.name !== null) {
            this.props.onChangeName(this.state.name);
        }
        if (this.state.x !== null && !isNaN(this.state.x)) {
            this.props.onChangeX(this.state.x);
        }
        if (this.state.y !== null && !isNaN(this.state.y)) {
            this.props.onChangeY(this.state.y);
        }
        this.setState({
            name: null,
            x: null,
            y: null
        });
    }
    handleChangeName (e) {
        this.setState({name: e.target.value});
    }
    handleChangeRotationStyle (e) {
        this.props.onChangeRotationStyle(e.target.value);
    }
    handleChangeX (e) {
        this.setState({x: e.target.value});
    }
    handleChangeY (e) {
        this.setState({y: e.target.value});
    }
    handleClickVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(true);
    }
    handleClickNotVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(false);
    }
    handleClickDraggable (e) {
        e.preventDefault();
        this.props.onChangeDraggability(true);
    }
    handleClickNotDraggable (e) {
        e.preventDefault();
        this.props.onChangeDraggability(false);
    }
    render () {
        const bufferedInputs = {
            name: this.state.name === null ? this.props.name : this.state.name,
            x: this.state.x === null ? this.props.x : this.state.x,
            y: this.state.y === null ? this.props.y : this.state.y
        };
        return (
            <SpriteInfoComponent
                {...this.props}
                {...bufferedInputs}
                onBlurName={this.handleFlush}
                onBlurX={this.handleFlush}
                onBlurY={this.handleFlush}
                onChangeName={this.handleChangeName}
                onChangeRotationStyle={this.handleChangeRotationStyle}
                onChangeX={this.handleChangeX}
                onChangeY={this.handleChangeY}
                onClickDraggable={this.handleClickDraggable}
                onClickNotDraggable={this.handleClickNotDraggable}
                onClickNotVisible={this.handleClickNotVisible}
                onClickVisible={this.handleClickVisible}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

SpriteInfo.propTypes = {
    ...SpriteInfoComponent.propTypes,
    onChangeDraggability: React.PropTypes.func,
    onChangeName: React.PropTypes.func,
    onChangeRotationStyle: React.PropTypes.func,
    onChangeVisibility: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
    x: React.PropTypes.number,
    y: React.PropTypes.number
};

module.exports = SpriteInfo;
