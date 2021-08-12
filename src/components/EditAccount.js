import { useState } from 'react';
import '../App.css';
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';
import userId from './Login'

function EditAccount(props) {
  const { token, setToken } = UseToken();
  const [infoFailureMessage, setInfoFailureMessage] = useState();
    // const userId = props.token.userId;
  

    if(!setToken) {
      setToken = UseToken().setToken;
      
    }

    async function handleEditValidation(e) {
      
      let firstName = e.target[0].value; 
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let password = e.target[4].value;

      let isInfoValid = true;

      if(firstName === ''){
        setInfoFailureMessage("First name is required");
        isInfoValid = false;
      }
      else if(lastName === ''){
        setInfoFailureMessage("Last name is required");
        isInfoValid = false;
      }
      else if(email === ''){
        setInfoFailureMessage("Email address is required");
        isInfoValid = false;
      }
      else if(!phoneNumber){
        setInfoFailureMessage("Phone number is required");
        isInfoValid = false;
      }        
      else if(!password){
        setInfoFailureMessage("Password is required");
        isInfoValid = false;
      }

      if(isInfoValid) {
        let user = {
          name: firstName + ' ' + lastName,
          email: email,
          phone: phoneNumber,
          password: password
        };
        try {
          let userId = token.user_id;
          let api_response = await UserApi.putUpdatedUser(user, userId);
          console.log(api_response);
          isInfoValid = true;
        } 
        catch(err) {
          console.log(err);
          if(err.response) {
            setInfoFailureMessage(err.response.data.error);
          } else {
            setInfoFailureMessage("An Unexpected Error Occured, Try Reloading!");
          }
          
          isInfoValid = false;
        }
      }
      
      return isInfoValid;
    }

    async function handleEditSubmit(e) {
      e.preventDefault();
      let isEditValid = await handleEditValidation(e);
      if(isEditValid === true) {
        setInfoFailureMessage("Changes were successful");

      }    
    }
    
    return(
      <div className="login-wrapper">
        <h1>Edit Account Info</h1>
        <form onSubmit={handleEditSubmit}>
            <label>
                <p>First Name</p>
                <input type="text"/>
            </label>
            <label>
                <p>Last Name</p>
                <input type="text"/>
            </label>
            <label>
                <p>Email</p>
                <input type="email"/>
            </label>
            <label>
                <p>Phone Number</p>
                <input type="text"/>
            </label>
            <label>
                <p>Password</p>
                <input type="password"/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
          <p>{infoFailureMessage}</p>
        </form>
      </div>
    );

}

export default EditAccount;