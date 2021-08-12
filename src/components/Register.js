import { useState } from 'react';
import '../App.css';
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';

function Register({ setToken }) {
    const [registerFailureMessage, setRegisterFailureMessage] = useState();
    
    if(!setToken) {
      setToken = UseToken().setToken;
    }

    async function handleRegisterValidation(e) {
      let firstName = e.target[0].value; // '' if no value passed in
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value;

      let isFormValid = true;

      if(firstName === ''){
        setRegisterFailureMessage("First name is required");
        isFormValid = false;
      }
      else if(lastName === ''){
        setRegisterFailureMessage("Last name is required");
        isFormValid = false;
      }
      else if(email === ''){
        setRegisterFailureMessage("Email address is required");
        isFormValid = false;
      }
      else if(!phoneNumber){
        setRegisterFailureMessage("Phone number is required");
        isFormValid = false;
      }        
      else if(!username){
        setRegisterFailureMessage("Username is required");
        isFormValid = false;
      }
      else if(!password){
        setRegisterFailureMessage("Password is required");
        isFormValid = false;
      }

      if(isFormValid) {
        let user = {
          name: firstName + ' ' + lastName,
          email: email,
          phone: phoneNumber,
          username: username
        };
        try {
          let api_response = await UserApi.postNewUser(user);
          console.log(api_response);
          isFormValid = true;
        } 
        catch(err) {
          console.log(err);
          if(err.response) {
            setRegisterFailureMessage(err.response.data.error);
          } else {
            setRegisterFailureMessage("An Unexpected Error Occured, Try Reloading!");
          }
          
          isFormValid = false;
        }
      }
      
      return isFormValid;
    }

    async function handleRegisterSubmit(e) {
      e.preventDefault();
      let isRegistrationValid = await handleRegisterValidation(e);
      if(isRegistrationValid === true) {
        setRegisterFailureMessage("Registration was successful! Please login to access website.");

      }    
    }
    
    return(
      <div className="login-wrapper">
        <h1>Please Sign Up</h1>
        <form onSubmit={handleRegisterSubmit}>
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
            <p>Username</p>
            <input type="text"/>
          </label>
          <label>
            <p>Password</p>
            <input type="password"/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
          <p>{registerFailureMessage}</p>
        </form>
      </div>
    );

}

export default Register;
