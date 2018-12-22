import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import axios from 'axios';
class Contact extends Component {
  state ={
    showContactInfo: false
  };

  onShowClick = e => {   
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  }
  onDeletClick = async (id,dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({type:'DELETE_CONTACT',payload:id});       
    } catch(e) {
      dispatch({type:'DELETE_CONTACT',payload:id});
    }
     
  }
  render() {
    const {name, email, phone,id} = this.props.contact;
    const {showContactInfo} = this.state;

    return (
      <Consumer>
      {value => {
        const {dispatch} =value;
        return(
          <div className="card card-body mb-3">
          <h4>
            {name}
            <i onClick={this.onShowClick} className="fas fa-sort-down" style={{cursor: 'pointer'}}></i>
            <i className="fas fa-times" onClick={this.onDeletClick.bind(this, id, dispatch)} style={{cursor: 'pointer',float: 'right', color: 'red'}}></i>
            <Link to={`contact/edit/${id}`}>
              <i className="fas fa-pencil-alt" style={{cursor: 'pointer',float: 'right', color: 'green',marginRight: '1em'}}></i>
            </Link>
          </h4>
          {showContactInfo ?(   
            <ul className="list-group">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
            </ul>
          ) : null}
  
        </div>
        )
      }}
    </Consumer>
    )
  }
}
Contact.propTypes = {
    contact: PropTypes.object.isRequired    
};

export default Contact;