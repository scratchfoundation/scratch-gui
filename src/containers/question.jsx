import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import QuestionComponent from '../components/question/question.jsx';

class Question extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChange',
            'handleKeyPress',
            'handleSubmit'
        ]);
        this.state = {
            answer: ''
        };
    }
    handleChange (e) {
        this.setState({answer: e.target.value});
    }
    handleKeyPress (event) {
        if (event.key === 'Enter') this.handleSubmit();
    }
    handleSubmit () {
        this.props.onQuestionAnswered(this.state.answer);
    }
    render () {
        return (
            <QuestionComponent
                answer={this.state.answer}
                question={this.props.question}
                onChange={this.handleChange}
                onClick={this.handleSubmit}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

Question.propTypes = {
    onQuestionAnswered: PropTypes.func.isRequired,
    question: PropTypes.string
};

export default Question;
