import api from "../api/api";
import UserApi from '../api/UserApi';

// Import bulma
import 'bulma/css/bulma.min.css';

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';

// Import our own overrides
import '../css/chats.css';

// The form as a component
const form = (
    <div class="container is-centered">
    <div class="content is-narrow is-centered">
    
    <section class="hero mt-2">
	<div class="hero-body">
            <h1 class="title has-text-centered">Send a Meme!</h1>
	</div>
    </section>

    <div class="field">
	<label class="label">Image URL</label>
        <div class="control">
            <input class="input" type="text" placeholder="Type URL here" />
        </div>
    </div>
    
    <div class="field">
	<label class="label">Expiration Date</label>
	<div class="control">
            <div class="select">
                <select>
                    <option>Never Expires</option>
                    <option>1 Day</option>
	            <option>3 Days</option>
	            <option>1 Week</option>
	            <option>3 Weeks</option>
	            <option>1 Month</option>
                </select>
            </div>
        </div>
    </div>
    
    <div class="field">
        <label class="label">Send To</label>
        <div class="control has-icons-left has-icons-right">
            <input class="input is-primary" type="text" placeholder="Type username here" />
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
        </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" placeholder="Type description here" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
         <button class="button is-link is-light">Cancel</button>
      </div>
    </div>

    <footer class="footer">
        <div class="content has-text-centered">
        <p><strong>Copyright © 2021 BDPA Twin Cities, All Rights Reserved.</strong></p>
	<p>The source code is available on <a href="https://github.com/MbabaEmmanuel/ghost-meme-app">Github</a> and is licensed with the <a href="http://opensource.org/licenses/mit-license.php">MIT License</a>.</p>
        </div>
    </footer>

    </div>
    </div>
);

function Chats() {
    let have_messages = true;
    /*return (
        <div class="tabs is-centered is-boxed is-medium">
	    <ul>
	    <li class="is-active"><h6> Send </h6></li>
	    {(() => {
                if(have_messages) {
                    return (<li><h6> Messages </h6></li>);
		} else {
                    return;
		}
            })()}
	    </ul>
	</div>
    )*/
    return form;
}

/*
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
        
        { <h1 id="placeholderFriends">Friends List</h1> }
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
*/
export default Chats;
