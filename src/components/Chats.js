import api from "../api/api";
import UserApi from '../api/UserApi';

function Chats() {

    async function handleMemeSubmit(e) {
        let owner = e.target[0].value;
        let imageUrl = e.target[1].value;
        let description = e.target[2].value
        let sendTo = e.target[3].value
        let expiredAt = e.target[4].value

        let meme = {
            owner: owner,
            receiver: null,
            expiredAt: expiredAt,
            description: description,
            private: true,
            replyTo: sendTo,
            imageUrl: imageUrl,
            imageBase64: null
        };
        console.log(meme);
        try {

            const response = await api.postNewMeme(meme);
        } catch(err){console.log("The following error has occured " + err)}
        //await UserApi.getAllUsers();
    }
    return (
        <>
        
        {/* <h1 id="placeholderFriends">Friends List</h1> */}
        <div className="login-wrapper">
            
        <h1>Send a Meme</h1>
            <form onSubmit={handleMemeSubmit}>
                <label>
                <p>ImageURL:</p>
                <input type="text"/>
                </label>
                <label>
                <p>Description:</p>
                <input type="text"/>
                </label>
                <label>
                <p>Send To:</p>
                <input type="text"/>
                </label>
                <label>
                <p>Expires At:</p>
                <input type="text"/>
                </label>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
}
export default Chats;