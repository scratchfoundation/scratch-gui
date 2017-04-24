const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const SpriteInfoComponent = require('../components/sprite-info/sprite-info.jsx');

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeName',
            'handleChangeRotationStyle',
            'handleChangeDirection',
            'handleChangeX',
            'handleChangeY',
            'handleClickVisible',
            'handleClickNotVisible',
            'handleFlush',
            'handleKeyPress'
        ]);
        this.state = {
            direction: null,
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
        if (this.state.direction !== null && !isNaN(this.state.direction)) {
            this.props.onChangeDirection(this.state.direction);
        }
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
            direction: null,
            name: null,
            x: null,
            y: null
        });
    }
    handleChangeDirection (e) {
        this.setState({direction: e.target.value});
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
    render () {
        const bufferedInputs = {
            direction: this.state.direction === null ? this.props.direction : this.state.direction,
            name: this.state.name === null ? this.props.name : this.state.name,
            x: this.state.x === null ? this.props.x : this.state.x,
            y: this.state.y === null ? this.props.y : this.state.y
        };
        return (
            <SpriteInfoComponent
                {...this.props}
                {...bufferedInputs}
                onBlurDirection={this.handleFlush}
                onBlurName={this.handleFlush}
                onBlurX={this.handleFlush}
                onBlurY={this.handleFlush}
                onChangeDirection={this.handleChangeDirection}
                onChangeName={this.handleChangeName}
                onChangeRotationStyle={this.handleChangeRotationStyle}
                onChangeX={this.handleChangeX}
                onChangeY={this.handleChangeY}
                onClickNotVisible={this.handleClickNotVisible}
                onClickVisible={this.handleClickVisible}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

SpriteInfo.propTypes = {
    ...SpriteInfoComponent.propTypes,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

module.exports = SpriteInfo;
