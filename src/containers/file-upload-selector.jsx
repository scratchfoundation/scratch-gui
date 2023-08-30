import React, {Component} from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectLocale} from '../reducers/locales';
import {closeLanguageMenu} from '../reducers/menus';
import axios from 'axios';
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
    }
    componentDidMount () {
        // axios.get(`${baseURL}`)
        //     .then(response => {
        //         this.setState({ products: response.data });
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });

        fetch(baseURL, {
            method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-moodle-session-key": "5hmvj5vuk0qupd0t1ntnps3ag8",
                        },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('datas',data);
            this.setState({ products: data?.data });
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });


    }
    handleProductChange = event => {
        // eslint-disable-next-line no-invalid-this
        this.setState({ selectedProduct: event.target.value });
        // axios.get(`https://fakestoreapi.com/products/${event.target.value}`)
            //     axios.get(`https://ai.myqubit.co/api/scratch/${event.target.value}`)
        
            // .then(response => {
            //     this.setState({ gotProducts: response.data });
            // })
            // .catch(error => {
            //     console.error('Error fetching data:', error);
            // });


            fetch(`https://ai.myqubit.co/api/scratch/${event.target.value}`, {
                method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "x-moodle-session-key": "5hmvj5vuk0qupd0t1ntnps3ag8",
                            },
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                console.log('datas',data);
                this.setState({ gotProducts: data?.data });
        })
              .catch(error => {
                console.error('Fetch error:', error);
              });


    };

    
    render () {
        const { products, selectedProduct } = this.state;

        return (
            <div>
            
            <select style={{width: "51px"}} value={selectedProduct} onChange={this.handleProductChange}>
               
                {products.map(product => (
                    <option 
                     key={product.id} 
                     value={product.id}>
                     {product.name}
                    </option> 
                ))}
            </select>
          
        </div>
        );
    }
}

export default FileUploadSelector;