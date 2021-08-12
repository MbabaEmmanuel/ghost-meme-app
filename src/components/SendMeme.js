import api from "../api/api";
import { useState } from 'react';
// import FileBase64 from 'react-file-base64';

function SendMeme(props) {
    const [error, setError] = useState('');

    async function readFileAsDataURL(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });

        return result_base64;
    }

    async function handleMemeSubmit(e) {
        e.preventDefault();
        try {
            let owner = props.token.user_id;
            let imageUrl = e.target[0].value;
            let imageFile  = e.target[1];
            let description = e.target[2].value;
            let receiver = e.target[3].value;
            let expiredAt = e.target[4].value;
	    let data = '';
             
	    // Convert the image data to Base64 (if needed)
	    if(imageFile != null) {
 		 data = await readFileAsDataURL(imageFile.files[0]);
	    }
	
	    let meme = {
                owner: owner,
                receiver: receiver,
                expiredAt: parseInt(expiredAt),// turn string into int
                description: description,
                private: true,
                replyTo: null,
                imageBase64: data,
		imageUrl: imageUrl
            };
	
            await api.postNewMeme(meme);
            setError("Successfully sent meme!")
        } 
        catch(err){
            console.log(err)
            setError(err.response.data.error)
        }
    }

    return (        
        <div className="floatLeft">
            <h1>Send a Meme</h1>
            <form onSubmit={handleMemeSubmit}>
                <label>
                <p>URL to Image:</p>
                <input type="text" />
                </label>
	        <label>
	        <p>File of Image (not required)</p>
	        <input type="file" />
	        </label>
                <label>
                <p>Description:</p>
                <input type="text" />
                </label>
                <label>
                <p>Send To User (enter user id):</p>
                <input type="text" />
                </label>
                <label>
                <p>Expires At:</p>
                <input type="text" />
                </label>
                <div>
                <button type="Send Meme">Submit</button>
                </div>
            </form>
            <p>{error}</p>
        </div>
    );
}

export default SendMeme;

