import axios from 'axios';
import { useFormState } from 'react-hook-form';

const instance = axios.create({
    baseURL:' https://ghostmeme.api.hscc.bdpa.org/v1',
    headers: {
        'key': 'tc159313-1fa1-4cee-9fdd-984b925628bf',
    },
});

export default {
    getAllMemes: () => 
    instance({
        'method':'GET',
        'url':'/memes',
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }],
    }),
    postNewUser: (user) =>
    instance({
        'method': 'POST',
        'url': '/users',
        data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
            imageBase64: null
        },
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }]
    }),
    postNewMeme: (meme) =>
    instance({
        'method': 'POST',
        'url': '/meme',
        data: {
            owner: meme.owner,
            receiver: meme.receiver,
            expiredAt: meme.expiredAt,
            description: meme.description,
            private: true,
            replyTo: null,
            imageURL: null,
            imageBase: null
        },
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }]
    })
}