import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';

function Login({ setToken }) {
    const [failureMessage, setFailureMessage] = useState();
    const [registerFailureMessage, setRegisterFailureMessage] = useState();
    const [userRegister, setUserRegister] = useState(false);
    const [response, setResponse] = useState();
    let isFormValid = true;
    
    if(!setToken){
      setToken = UseToken().setToken;
    }

    let history = useHistory();

    function handleLoginValidation(e) {
      let username = e.target[0].value;
      let password = e.target[1].value

      if(!username){
        setFailureMessage("Username is required");
        isFormValid = false;
      }

      if(!password){
        setFailureMessage("Password is required");
        isFormValid = false;
      }

      if(isFormValid){
        setResponse(UserApi.getUserName(username));
        console.log(response);
      }
  }

    async function handleRegisterValidation(e) {
      let firstName = e.target[0].value;
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value;

      if(!firstName){
        setRegisterFailureMessage("First name is required");
        return false;
      }

      if(!lastName){
        setRegisterFailureMessage("Last name is required");
        return false;
      }

      if(!email){
        setRegisterFailureMessage("Email address is required");
        return false;
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        setRegisterFailureMessage("Invalid email address.");
        return false;
      }

      if(!phoneNumber){
        setRegisterFailureMessage("Phone number is required");
        return false;
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
        return false;
      }

      if(!password){
        setRegisterFailureMessage("Password is required");
        return false;
      }

      let user = {
        name: firstName + ' ' + lastName,
        email: email,
        phone: phoneNumber,
        username: username
      };

        //console.log(user);
      let await_variable = await api.postNewUser(user);
      setResponse(await_variable);
      console.log(await_variable);
      
      return true;
    }

    async function handleSubmit(e) {
        
        const token = handleLoginValidation(e);
    
        if(token){
            setToken(token);
            history.push("/");
        }
        else{
            setFailureMessage("Incorrect username or password")
        }
    }

    async function handleRegisterSubmit(e) {
      let my_status = await handleRegisterValidation(e);
      if(my_status){
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
        <p>{failureMessage}</p>
      </form>
    </div>
    )
}

export default Login;