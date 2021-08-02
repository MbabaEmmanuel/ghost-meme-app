import SendMeme from './SendMeme'
import ChatView from './ChatView'
import UseToken from './UseToken';
import Login from './Login';

function Chats() {
    const { token, setToken } = UseToken();

    if(!token) {
        return <Login setToken={setToken}/>
    }

    return (        
        <div className="chats-wrapper">
        <SendMeme token={token}/>
        <ChatView token={token} />

        </div>
    );
}
export default Chats;