import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import api from '../api/api';
import UserApi from '../api/UserApi';

//Login and Register Page for User
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

    //Validate the Login of Users, and set user information in token.
    function handleLoginValidation(e) {
      let username = e.target[0].value;
      let password = e.target[1].value

      if(!username){
        setRegisterFailureMessage("Username is required");
        isFormValid = false;
      }

      if(!password){
        setRegisterFailureMessage("Password is required");
        isFormValid = false;
      }

      if(isFormValid){
        setResponse(UserApi.getUserName(username));
        console.log(response);
      }
    }

  //Validate the Registration of Users, showing any errors to user, and and setting user information in token
    async function handleRegisterValidation(e) {
      let firstName = e.target[0].value;
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value;

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
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        setRegisterFailureMessage("Invalid email address.");
        isFormValid = false;
      }

      if(!phoneNumber){
        setRegisterFailureMessage("Phone number is required");
        isFormValid = false;
      } 
      
      // if(phoneNumber){    
      //   var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
      //   if (!mobPattern.test(phoneNumber)) {    
      //     setRegisterFailureMessage("Invalid phone number.");
      //     isFormValid = false;
      //   } 
      // }
        
      if(!username){
        setRegisterFailureMessage("Username is required");
        isFormValid = false;
      }

      if(!password){
        setRegisterFailureMessage("Password is required");
        isFormValid = false;
      }

      if(isFormValid){
        let user = {
          name: firstName + ' ' + lastName,
          email: email,
          phone: phoneNumber,
          username: username
        };

        try {
          let registerResponse = await api.postNewUser(user);
          setResponse(registerResponse);
          setToken(response.data.user.user_id);
          console.log('success');
          isFormValid = true;
        } catch(err) {
          console.log(err.response);
          setRegisterFailureMessage(err.response.data.error);
          isFormValid = false;
        }
      }
      
      return isFormValid;
    }

    //Function called when user submits Login form
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

    //Function called when user submits Registration Form.
    async function handleRegisterSubmit(e) {
      let registrationValidation = await handleRegisterValidation(e);
      if(registrationValidation === true){
        console.log('History');
        history.push("/");
      }           
    }
    
    function registerUser() {
      setUserRegister(true);
    }
    
    //Registration Form
    if (userRegister) {
      return(
        <div className="login-wrapper">
          <h1>Please Sign Up</h1>
          <form onSubmit={handleRegisterSubmit}>
            <label>
              <p>First Name</p>
            </label>
              <input type="text"/>
            <label>
              <p>Last Name</p>
            </label>
              <input type="text"/>
            <label>
              <p>Email</p>
            </label>
              <input type="email"/>
            <label>
              <p>Phone Number</p>
            </label>
              <input type="telephone"/>
            <label>
              <p>Username</p>
            </label>
              <input type="text"/>
            <label>
              <p>Password</p>
            </label>
              <input type="password"/>
            <div>
              <button type="submit">Submit</button>
            </div>
            <p>{registerFailureMessage}</p>
          </form>
        </div>
      );
    }

    //Login Form
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