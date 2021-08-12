import Stories from './components/Stories';
import Login from './components/Login';
import Logout from './components/Logout';
import Chats from './components/Chats';
import Register from './components/Register';
import Notifications from './components/Notifications';
import FullConversation from './components/FullConversation';
import './App.css';
import { Route, NavLink, Router } from "react-router-dom";
import UseToken from './components/UseToken';
import history from "./History";
import DarkMode from './components/Darkmode';
import { useEffect} from 'react'

function App() {
  const token = UseToken().token;
  
  return (
    <Router history={history}>
      <div>
        <ul className="header">
          <li><NavLink exact to ="/">Stories</NavLink></li>
          <li><NavLink to="/chats">Chats</NavLink></li>
          <li><NavLink to="/notifications">Notifications</NavLink></li>
          {token ? <li><NavLink to="/logout">Logout</NavLink></li> : null}
          {token ? null : <li><NavLink to="/login">Login</NavLink></li>}
          {token ? null : <li><NavLink to="/register">Register</NavLink></li>}
        </ul>
      </div>
      <div>
       
      </div>
      <div>
        <Route exact path="/" component={Stories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chats" component={Chats} />
        <Route exact path="/logout" component={Logout} />
	      <Route exact path="/register" component={Register} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/chats/:name" component={FullConversation} />
        <Route exact path="/" component={DarkMode} />
        <Route exact path="/login" component={DarkMode} />
        <Route exact path="/chats" component={DarkMode} />
        <Route exact path="/register" component={DarkMode} />
        <Route exact path="/notifications" component={DarkMode} />

        
      </div>
    </Router>
  )
   function DarkMode() {
    async function clickDarkMode() {
        const btn = document.querySelector(".btn-toggle");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

        btn.addEventListener("click", function () {
            if (prefersDarkScheme.matches) {
                document.body.classList.toggle("light-theme");
            } else {
                document.body.classList.toggle("dark-theme");
            }
        });
    }


    useEffect(
        () => {
            clickDarkMode();
        }, []
    )


    return (
      
        <button class="btn-toggle">Toggle Dark-Mode</button>
 

        
    )
    };
}

export default App;
