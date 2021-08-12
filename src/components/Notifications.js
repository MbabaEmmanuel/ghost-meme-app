import { useEffect, useState } from 'react';
import api from '../api/api';
import Meme from './Meme';
import Login from './Login';
import UseToken from './UseToken';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';



function Notifications (props, DarkMode) {
   
   
    const [memes, setMemes] = useState([]);
    const [comments, setComments] = useState([]);
    const { token, setToken } = UseToken();

   async function notifyalmostExpired(){
         let isExpired;
    if(props.data.expiredAt > Date.now() || props.data.expiredAt === -1){
        isExpired = false;
    }
    else{
        isExpired = true;
    } 
    if (
        props.data.expiredAt < Date.now() 
    ) return 
        store.addNotification({
        title: "Meme about to expire",
        message: "A meme of yours is about to expire",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        
        } 
      });
    
        
    

   }
  

    // view all memes that are a comment (aka a meme that is a replyTo: (memeId that I own))
    // OR
    // view all Memes where the description is @myUserName

    async function fetchAllNotifications() {
        try {
            let userId = token.user_id;
            let username = token.username;
            const mentionsResponse = await api.getAllUserMentions(username); // axios library uses async code
            const myMemesResponse = await api.getMemesSentByUser(userId);

            // these are the meme id's I own
            const myMemeIds = myMemesResponse.data.memes.map(x => x.meme_id)

            // get all the comments in response to the memes I own
            const commentsResponse = await api.getAllCommentsOnMemes(myMemeIds);

            setMemes(mentionsResponse.data.memes);
            setComments(commentsResponse.data.memes);

        } catch(err) {
            console.log(err);
        }
    }


    // useEffect is from React
    // call api code 
    useEffect(
        () => {
            fetchAllNotifications();
        }, []
    )

    if(!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <div>
            <h1>Notifications</h1>
            <div className="floatLeft">
                <h2>Your Mentions</h2>
                {memes.length > 0 ? memes.map(m => <Meme data={m} />) : (
                    <h1>No Mentions to display</h1>
                )}
            </div>
            <div className="floatRight">
                <h2>Comments on your Memes</h2>
                {comments.length > 0 ? comments.map(m => <Meme data={m} />) : (
                    <h1>No Comments to display</h1>
                )}
            </div>
        </div>
    );
}

export default Notifications;
