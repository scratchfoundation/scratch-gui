import React, { Component } from 'react';
import styles from'./ClickableCard.css';
import { addUpload } from '../../containers/action';
import { fileUpload } from '../../containers/fileAction';
import { setFunction} from '../../containers/setFunction';
import {connect} from 'react-redux';

export class CardsProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            buttonDisabled: true,
            projectData: this.props.projectData
        };
    }
    openModal = () => {
        this.setState({ isModalOpen: true });
    }
    
    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.props.projectData;
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    
    handleClickOutside = (event) => {
        if (this.modalRef && !this.modalRef.contains(event.target)) {
            this.closeModal();
        }
    }
    

    handleCardClick = () => {
        const findId = this.props.projectData;
        if (findId && findId) {
            this.props.addUpload(findId);
            this.props.setFunction(findId);
        }
        this.props.onRequestCardClose();
    }


    handleDelete = (id) =>{
        const dontDelete = this.props.projectData?.id === id;
        console.log("first delete", dontDelete);
     console.log("ID", id, this.props.projectData);
     
     const requestOptions = {
        method: 'DELETE',
        headers: {  "Accept": "<MIME_type>/*",
        "x-moodle-session-key": "f0e9bgfmtp01f2gid6j6n9q2l9", }
        };
            fetch(`https://ai.myqubit.co/api/scratch/${id}`, requestOptions)
        .then((res) => {
            
           return res;
           
        })              
        .catch((err) => {
          
            return Promise.reject({ Error: 'Something Went Wrong', err });
        })
        

        
        this.props.refreshApiData()
     this.closeModal();
    }

    render() {
        const { id, name } = this.state.projectData;
        const isModalOpen = this.state.isModalOpen;
        console.log(this.state.projectData);
        return (
            <div>
              
            <div ref={(node) => (this.modalRef = node)} className={`${styles?.container} ${isModalOpen ? styles?.blur : ''}`}>
            <div className={styles?.card} onClick={this.handleCardClick}>
                <h2>{name.slice(0, -4)}</h2>
                <p>Click anywhere to open the Project</p>
            </div>
            <button className={styles?.deleteButton} onClick={this.openModal}>Delete</button>

            {isModalOpen && (
                <div className={styles?.modal}>
                    <p>Are you sure you want to delete {name.slice(0, -4)}?</p>
                    <button onClick={this.closeModal}>Cancel</button>
                    <button onClick={()=>this.handleDelete(id)}>Confirm Delete</button>
                </div>
            )}
        </div>
        </div>
           
            
        )
    }
}
const mapDispatchToProps = dispatch => ({
    addUpload: (todo) => dispatch(addUpload(todo)),
    fileUpload: (files)=> dispatch (fileUpload(files)),                                                                                                                                                                     
    setFunction : (findId) => dispatch(setFunction(findId))                                                                                                                           
  });

export default connect(null, mapDispatchToProps)(CardsProjects);