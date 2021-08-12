import Stories from './components/Stories';
import Login from './components/Login';
import Logout from './components/Logout';
import Chats from './components/Chats';
import Register from './components/Register';
import Notifications from './components/Notifications';
import FullConversation from './components/FullConversation';
import EditAccount from './components/EditAccount';
import Spotlight from './components/Spotlight';
import './App.css';
import { Route, NavLink, Router } from "react-router-dom";
import UseToken from './components/UseToken';
import history from "./History";
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
          {token ? <li><NavLink to="/editAccount">Edit Account</NavLink></li> : null}
          {token ? null : <li><NavLink to="/spotlight">Spotlight</NavLink></li>}
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
        <Route exact path="/Spotlight" component={Spotlight} />
        <Route exact path="/logout" component={Logout} />
	      <Route exact path="/register" component={Register} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/chats/:name" component={FullConversation} />
        


        
      </div>
    </Router>
  )
  }

export default App;
