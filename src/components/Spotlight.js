import { useState, useEffect } from 'react';

function Spotlight() {

    const [error, setError] = useState();
    const [memes, setMemes] = useState();

    async function fetchAllPublicMemes(memeId) {
        try {
            const response = await api.getPublicMemes(memeId);
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
            fetchAllPublicMemes();
        }, []
    )
}

export default Spotlight;