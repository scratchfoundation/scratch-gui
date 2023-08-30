import React, {Component} from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectLocale} from '../reducers/locales';
import {closeLanguageMenu} from '../reducers/menus';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { addUpload } from './action';
import { fileUpload } from './fileAction';
import { setFunction} from './setFunction';
import { findIndex } from 'core-js/fn/array';
import Modal from '../containers/modal.jsx';


const baseURL = "https://ai.myqubit.co/api/scratch";

class FileUploadSelector extends Component {
    constructor (props) {
        super(props);
        this.state = {
            products: [],
            gotProducts:[],
            selectedProduct: '' // Default selected product
        };
        this.handleProductChange = this.handleProductChange.bind(this);

        // this.handleConvertAndSave = this.handleConvertAndSave.bind(this);
    }
    componentDidMount () {

        fetch(baseURL, {
            method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-moodle-session-key": "f0e9bgfmtp01f2gid6j6n9q2l9",
                        },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response?.status}`);
            }
            return response.json();
          })
          .then(data => {
            this.setState({ products: data?.data });
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });


    }
    handleProductChange = event => {
        
              const findId = this?.state?.products?.find((product) => product?.id == event.target.value);
               console.log("findId:", findId);

               if (findId && findId) {
                this.props.addUpload(findId);
                this.props.setFunction(findId);
              }
    };  

    render () {
        const { products, selectedProduct } = this.state;

        return (
            <div>
          
            <select style={{width: "51px"}} value={selectedProduct} onChange={this.handleProductChange}>
               
                {products?.map(product => (
                    <option 
                     key={product?.id} 
                     value={product?.id}>
                     {product.name}
                    </option> 
                ))}
            </select>
          
        </div>

        // <Modal fullScreen
        // contentLabel={this.props.title}
        // id={this.props.id}
        // onRequestClose={this.handleClose}>

        // </Modal>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    addUpload: (todo) => dispatch(addUpload(todo)),
    fileUpload: (files)=> dispatch (fileUpload(files)),                                                                                                                                                                     
    setFunction : (findId) => dispatch(setFunction(findId))                                                                                                                           
  });

export default connect(null, mapDispatchToProps)(FileUploadSelector);