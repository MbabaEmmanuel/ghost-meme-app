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

    function registerUser() {
        history.push("/register");
    }

    async function handleLoginValidation(e) {
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

      if(isFormValid) {
	try {
            let usr_status = await UserApi.getUserName(username);
	    setResponse(usr_status);
            console.log(usr_status);
	    isFormValid = true;
	} catch(e) {
            console.log(e);
	    isFormValid = false;
	}
	return isFormValid;
      }
  }

    async function handleSubmit(e) {
        
        const token = await handleLoginValidation(e);
    
        if(token) {
            setToken(token);
            history.push("/");
        } else {
            setFailureMessage("Incorrect username or password")
        }
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
