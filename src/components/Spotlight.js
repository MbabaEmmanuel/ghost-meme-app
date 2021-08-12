import { useState, useEffect } from 'react';
import api from '../api/api';
import Meme from './Meme';
import Pagination from './Pagination';

function Spotlight() {
    const [error, setError] = useState('');
    const [publicMemes, setPublicMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchAllPublicMemes(memeId) {
        try {
            const response = await api.getPublicMemes(memeId);
            setPublicMemes(response.data.memes);

        } catch(err) {
            setError('The following error has occurred ' + err);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(
        () => {
            fetchAllPublicMemes();
        }, []
    )

    return (
        <>
            {publicMemes.length > 0 ? (
                <>
                    <Pagination
                      data={publicMemes}
                      RenderComponent={Meme}
                      title="Public Memes"
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

export default Spotlight;