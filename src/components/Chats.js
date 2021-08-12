import SendMeme from './SendMeme'
import ChatView from './ChatView'
import UseToken from './UseToken';
import Login from './Login';
import '../App.css'

function Chats() {
    const { token, setToken } = UseToken();

    
    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="chats-wrapper">
            {/* refreshes page every 5 seconds */}
            {/* <meta http-equiv="refresh" content="5" /> */}

            <SendMeme token={token} />
            <ChatView token={token} />
        </div>
    );
}

export default Chats;

