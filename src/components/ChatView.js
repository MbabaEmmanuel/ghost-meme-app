import { useEffect, useState } from 'react';
import '../App.css';
import ChatPreview from './ChatPreview';
import api from '../api/api';
import UserApi from '../api/UserApi';

function ChatView(props) {
    const [groupedMemes, setGroupedMemes] = useState([]);

    async function fetchAllSentAndReceivedMemes() {
        try {
            const userId = props.token.user_id;
            const username = props.token.username;
            const response = await api.getMemesReceivedByUser(userId);
            const sentResponse = await api.getMemesSentByUser(userId);

            for (let i = 0; i < response.data.memes.length; i++) {
                response.data.memes[i].type = "Received";
            }

            let receivedMemes = response.data.memes;
            let sentMemes = sentResponse.data.memes.filter(x => x.receiver != null)
            sentMemes.forEach(y => y.owner = username);
                
            let groupedMemes = CombineSentAndReceivedMemes(receivedMemes, sentMemes);

            for(let i = 0; i < groupedMemes.length; i++){
                try {
                    let userResponse = await UserApi.getUser(groupedMemes[i].OtherUserId)
                    groupedMemes[i].OtherUserId = userResponse.data.user.username;
                    groupedMemes[i].MemesConvo.filter(x => x.type == "Received").map(y => y.owner = userResponse.data.user.username)
                }
                catch(err) {
                    console.log(err);
                }
            }

            setGroupedMemes(groupedMemes);
        } catch(err) {
            console.log(err);
        }
    }

    function DisplayChats(groupedMemes) {
        return groupedMemes.map(x => <ChatPreview data={x} />)
    }
      
    function CombineSentAndReceivedMemes(receivedMemes, sentMemes) {
        var groupedMemes = [];
        /*
            * [
            {"OtherUserId": 1234, "MemesConvo":[{meme}, {meme}]},
            {"OtherUserId": 5432, "MemesConvo":[{meme}, {meme}]},
            ]
        */
        
        for (let i = 0; i < receivedMemes.length; i++) {
            let found = groupedMemes.findIndex(x => x.OtherUserId == receivedMemes[i].owner);
            if(found > -1){
                groupedMemes[found].MemesConvo.push(receivedMemes[i])
            }
            else{
                groupedMemes.push({"OtherUserId": receivedMemes[i].owner, "MemesConvo": [receivedMemes[i]]})
            }
        }
        for (let i = 0; i < sentMemes.length; i++) {
            let found = groupedMemes.findIndex(x => x.OtherUserId == sentMemes[i].receiver);
            if(found > -1){
                groupedMemes[found].MemesConvo.push(sentMemes[i])
            }
            else{
                groupedMemes.push({"OtherUserId": sentMemes[i].receiver, "MemesConvo": [sentMemes[i]]})
            }
        }
        
        // sort the meme conversations by when they were created in descending order
        for(let i = 0; i < groupedMemes.length; i++){
            groupedMemes[i].MemesConvo.sort((x,y) => y.createdAt - x.createdAt);
        }

        console.log("Sorted Logs:" + groupedMemes); //todo delete and double check
        return groupedMemes;
    }

    useEffect(
        () => {
          fetchAllSentAndReceivedMemes();
        }, []
    )

    return (
        <div className="floatRight">
            <h1>Messages</h1>
            {(groupedMemes.length > 0) ? 
                DisplayChats(groupedMemes)
                : 
                <h1>No Chats to display</h1> }
        </div>
    );
}
export default ChatView;