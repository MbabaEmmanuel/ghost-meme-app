import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import api from '../api/api';

async function loginUser(username, password) {
    // insert logic to check username/password combo
    if(username === "fatuma" && password === "123") {
        return "successfully signed in";
    }
    else {
        return null;
    }
}

async function signUpUser(firstName, lastName, email, username, password, phoneNumber) {
  if(firstName === "fatuma" && lastName === "abdi" && email === "fatuma@gmail.com" 
     && username === "fatumaA" && password === "123" && phoneNumber === "612-000-0000") {
      return "successfully signed up";
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
      let firstName = e.target[0].value;
      let lastName = e.target[1].value
      let email = e.target[2].value;
      let phoneNumber = e.target[3].value
      let username = e.target[4].value;
      let password = e.target[5].value
      
      const token = await signUpUser(firstName, lastName, email, username, password, phoneNumber);
    
        if(token){
            setToken(token);
            history.push("/");
        }
        else{
            setFailureMessage("Incorrect input fields")
        }

      let user = {
        name: firstName + ' ' + lastName,
        email: email,
        phone: phoneNumber,
        username: username
      };
      //console.log(user);
      await api.postNewUser(user);
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