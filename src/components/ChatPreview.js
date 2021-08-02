import { Link } from "react-router-dom";

function ChatPreview (props) {
    let fromUser = props.data.OtherUserId;
    return (
        <Link
        to={{
            pathname: "/chats/" + fromUser, 
            state: {
              memes: props.data.MemesConvo,
            },
          }}
          className="btn btn-primary">
            <div className="chatPreview">
            <p>Conversation with: {fromUser}</p>
            </div>
        </Link>   
    );
}

export default ChatPreview;
