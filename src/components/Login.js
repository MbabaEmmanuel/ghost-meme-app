import { useState } from 'react';
import '../App.css';
import { useHistory } from "react-router-dom";
import UseToken from './UseToken';
import UserApi from '../api/UserApi';

function Login({ setToken }) {
    const [failureMessage, setFailureMessage] = useState();
    const [response, setResponse] = useState();

    let userValid = true;
    
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
      userValid = true;
      
      if(!username){
        setFailureMessage("Username is required");
        userValid = false;
      }
      else if(!password){
        setFailureMessage("Password is required");
        userValid = false;
      }
      
      if(userValid) {
        try {
          let userResponse = await UserApi.getUserName(username);
          setResponse(userResponse.data.user);
          userValid = userResponse.data.user;
        }
        catch(e) {
          console.log(e);
          userValid = false;
        }
      }
      return userValid;
    }

    async function handleSubmit(e) {
      e.preventDefault();
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
