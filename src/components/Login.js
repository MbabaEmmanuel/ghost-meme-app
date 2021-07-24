import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';

async function loginUser(username, password) {
    // insert logic to check username/password combo
    if(username === "fatuma" && password === "123") {
        return "successfully signed in";
    }
    else {
        return null;
    }
}


function Login({ setToken }) {
    const [failureMessage, setFailureMessage] = useState();
    const [registerFailureMessage, setRegisterFailureMessage] = useState();
    const [userRegister, setUserRegister] = useState(false);
    
    if(!setToken){
      setToken = UseToken().setToken;
    }

    let history = useHistory();

    function handleRegisterValidation(e) {
      let isFormValid = true;
      let firstName = e.target[0].value;
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value;

      if(!firstName){
        setFailureMessage("First name is required");
        isFormValid = false;
      }

      if(!lastName){
        setFailureMessage("Last name is required");
        isFormValid = false;
      }

      if(!email){
        setFailureMessage("Email address is required");
        isFormValid = false;
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        setFailureMessage("Invalid email address.");
        isFormValid = false;
      }

      if(!phoneNumber){
        setFailureMessage("Phone number is required");
        isFormValid = false;
      } 
      
      if(phoneNumber){    
        var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
        if (!mobPattern.test(phoneNumber)) {    
          setFailureMessage("Invalid phone number.");
          isFormValid = false;
        } 
      }
        
      if(!username){
        setFailureMessage("Username is required");
        isFormValid = false;
      }
      
      if(!password){
        setFailureMessage("Password is required");
        isFormValid = false;
      }

      if(isFormValid){
        let user = {
          name: firstName + ' ' + lastName,
          email: email,
          phone: phoneNumber,
          username: username
        };
        //console.log(user);
        api.postNewUser(user);
      }
      
      return isFormValid;
    }

    async function handleSubmit(e) {
        let username = e.target[0].value;
        let password = e.target[1].value
        
        const token = await loginUser(username, password);
    
        if(token){
            setToken(token);
            history.push("/");
        }
        else{
            setFailureMessage("Incorrect username or password")
        }
    }

    async function handleRegisterSubmit(e) {
      if(handleRegisterValidation(e)){
        const token = "Successfully signed in";

        setToken(token);
        history.push("/");
      }           
  }
    
    function registerUser() {
      setUserRegister(true);
    }
    
    if (userRegister) {
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
              <input type="text"/>
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
            <p>{failureMessage}</p>
          </form>
        </div>
      );
    }

    return (
      <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
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
          <button onClick={registerUser} type="button">Need to Register</button>
        </div>
        <p>{setRegisterFailureMessage}</p>
      </form>
    </div>
    )
}

export default Login;