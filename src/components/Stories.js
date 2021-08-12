import { useEffect, useState } from 'react';
import api from '../api/api';
import Meme from './Meme';
import Pagination from './Pagination';
import Login from './Login';
import UseToken from './UseToken';

function Stories () {
    const [memes, setMemes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { token, setToken } = UseToken();

    async function fetchAllMemes() {
        try {
            const response = await api.getAllMemes();
            setMemes(response.data.memes);

        } catch(err) {
            setError('The following error has occurred ' + err);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(
        () => {
            fetchAllMemes();
        }, []
    )

    if(!token) {
        return <Login setToken={setToken}/>
    }

    if(loading) {
        return "Loading...";
    }  

    return (
        <>
            {memes.length > 0 ? (
                <>
                    <Pagination
                      data={memes}
                      RenderComponent={Meme}
                      title="Memes"
                      pageLimit={5}
                      dataLimit={10}
                    />
                 </>
            ) : (
                <h1>No Memes to display</h1>
            )}
        </>
    );
}

export default Stories;