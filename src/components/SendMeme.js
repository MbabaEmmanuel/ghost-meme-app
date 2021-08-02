import api from "../api/api";
import { useState } from 'react';

function SendMeme(props) {
    const [error, setError] = useState('');

    async function handleMemeSubmit(e) {
        e.preventDefault();
        let owner = props.token.user_id;
        let imageUrl = e.target[0].value;
        let description = e.target[1].value
        let receiver = e.target[2].value
        let expiredAt = e.target[3].value

        let meme = {
            owner: owner,
            receiver: receiver,
            expiredAt: parseInt(expiredAt),
            description: description,
            private: true,
            replyTo: null,
            imageUrl: imageUrl,
            imageBase64: null
        };
        try {
            await api.postNewMeme(meme);
        } catch(err){
            console.log("The following error has occured " + err)
            setError(err.response.data.error)
        }
    }

    return (        
        <div className="floatLeft">
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
                <p>Send To User:</p>
                <input type="text"/>
                </label>
                <label>
                <p>Expires At:</p>
                <input type="text"/>
                </label>
                <div>
                <button type="Send Meme">Submit</button>
                </div>
            </form>
            <p>{error ? "Error posting meme: " + error : null}</p>
        </div>
    );
}

export default SendMeme;