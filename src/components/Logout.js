import { useHistory } from "react-router-dom";

function Logout() {

    sessionStorage.clear();
    let history = useHistory();
    history.push("/");

    return (null);
}

export default Logout;

