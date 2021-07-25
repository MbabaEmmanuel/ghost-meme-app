// import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "react-router-dom";

function Logout() {

    sessionStorage.clear();
    let history = createBrowserHistory();
    // history.go(0);
    history.push("/");

    return (null);
}

export default Logout;

