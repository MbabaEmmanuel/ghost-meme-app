import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';

function Register({ setToken }) {
    const [registerFailureMessage, setRegisterFailureMessage] = useState();
    const [userRegister, setUserRegister] = useState(false);
    const [response, setResponse] = useState();
    let isFormValid = true;
    
    if(!setToken){
      setToken = UseToken().setToken;
    }

    let history = useHistory();

    async function handleRegisterValidation(e) {
      let firstName = e.target[0].value;
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value;

      let isFormValid = false;

      if(!firstName){
        setRegisterFailureMessage("First name is required");
        isFormValid = false;
      }

      if(!lastName){
        setRegisterFailureMessage("Last name is required");
        isFormValid = false;
      }

      if(!email){
        setRegisterFailureMessage("Email address is required");
        isFormValid = false;
      } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        setRegisterFailureMessage("Invalid email address.");
        isFormValid = false;
      }

      if(!phoneNumber){
        setRegisterFailureMessage("Phone number is required");
        isFormValid = false;
      } 
/*      
      if(phoneNumber){    
        var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
        if (!mobPattern.test(phoneNumber)) {    
          setRegisterFailureMessage("Invalid phone number.");
          return false;
        } 
      }
*/        
      if(!username){
        setRegisterFailureMessage("Username is required");
        isFormValid = false;
      }

      if(!password){
        setRegisterFailureMessage("Password is required");
        isFormValid = false;
      }

      let user = {
        name: firstName + ' ' + lastName,
        email: email,
        phone: phoneNumber,
        username: username
      };

      try {
          let api_response = await api.postNewUser(user);
          setResponse(api_response);
          console.log(api_response);
	  isFormValid = true;
      } catch(err) {
          console.log(err);
	  if(err.response) {
            setRegisterFailureMessage(err.response.data.error);
	  } else {
            setRegisterFailureMessage("An Unexpected Error Occured, Try Reloading!");
	  }
          isFormValid = false;
      }
      
      return isFormValid;
    }

    async function handleRegisterSubmit(e) {
      let my_status = await handleRegisterValidation(e);
      if(my_status === true) {
        const token = "Successfully signed in";

        setToken(token);
        console.log(my_status);
        history.push("/");
      } else {
        console.log("failed!\n");
        console.log(my_status);
      }           
  }
    
    function registerUser() {
      setUserRegister(true);
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
