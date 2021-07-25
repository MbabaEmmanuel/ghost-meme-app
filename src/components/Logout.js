import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from "react-router-dom";

function Logout() {

    sessionStorage.clear();
    // TODO: Investigate into using other methods for reloading the page 
    let history = useHistory();
    history.push("/");

    return (null);
}

export default Logout;

