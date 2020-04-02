import React from 'react';
import styles from '../index.css';
import {scrollCSS} from '../style.js';

export default class SelectModelComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value:3
        };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount () {}
    onChange(e) {
        this.setState({
            value: event.target.value
        })
    }

    render () {
        return (
            <div id="select_learnclass_model" style={{display: "none"}}>
                <div dangerouslySetInnerHTML={{__html: scrollCSS()}} />
                <div id="mask" />
                <div id="newmodel_modal">
                    <span id="close_newmodel">×</span>
                    <div className={styles.input_learningclass_model}>
                        <span style={{fontSize: "20px"}}>模型分类数量：</span>
                        <input id="learningclass_model_count" onChange={this.onChange} type="number" min="3" max="30" value={this.state.value} />
                    </div>
                    <a href="javascript:;" id="newmodel_confirm">确定</a>
                </div>
            </div>
        );
    }
}
