import { useLocation } from "react-router-dom";
import Meme from './Meme';

function FullConversation() {
    const location = useLocation();
    //passed in memes
    const { memes } = location.state;
    
    return memes.map(m => <Meme data={m} />)
}
export default FullConversation;