import api from '../api/api';
import { useEffect, useState } from 'react';

function Meme (props) {
    const imageUrl = props.data.imageUrl;
    const [description, setDescription] = useState(props.data.description);
    const owner = props.data.owner;
    const meme_id = props.data.meme_id;
    const createdAt = new Date(props.data.createdAt);

    let isExpired = false;
    if(props.data.expiredAt > Date.now() || props.data.expiredAt === -1){
        isExpired = false;
    }
    else{
        isExpired = true;
    }

    async function counts() {
	if(description == null) {
            return;
	}

        let str = description.match(/#(\w)+/g);
        if(str != null) {
            for (let i = 0; i < str.length; i++) {
	        api.getCountForID(str).then((dat) => {
                    let realVal = str[i] + " (" + dat.data + ") ";
		    setDescription(description.replaceAll(str[i], realVal));
		});
            }
        }
    }

    useEffect(
        () => {
            counts();
        }, []
    );

    async function manuallyVanishMeme(memeId){
        try{
            await api.updateMeme(memeId, 0);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {!isExpired ?
                <div className="meme">
                    <p>Created At: {createdAt.toLocaleString()}</p>
                    <p>From: {owner}</p>
                    <img src={imageUrl} width="400" />
                    <p>{description}</p>
                    <button onClick={() => manuallyVanishMeme(meme_id)} type="button">Vanish!</button>
                </div> 
                : 
                <div className="meme"> Expired </div>
                }
        </div>
    );
}

export default Meme;

