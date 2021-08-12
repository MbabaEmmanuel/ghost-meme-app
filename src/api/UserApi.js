import axios from 'axios';
import { useFormState } from 'react-hook-form';

const instance = axios.create({
    baseURL:' https://ghostmeme.api.hscc.bdpa.org/v1',
    headers: {
        'key': 'tc159313-1fa1-4cee-9fdd-984b925628bf',
    },
});

// function updatingUserInfo(userId) {

// }

export default {
    getAllUsers: () => 
    instance({
        'method':'GET',
        'url':'/users',
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }],
    }),
    getUser: (userId) => 
    instance({
        'method':'GET',
        'url':'/users/' + userId,
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }],
    }),
    getUserName: (username) => 
    instance({
        'method':'GET',
        'url':'/users/' + username,
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
    putUpdatedUser: (userId) =>
    instance({
        'method': 'PUT',
        'url': '/users' + userId,
        // data: {
        //      name: user.name,
        //      email: user.email,
        //      phone: user.phone,
        //      username: user.username,
        //      imageBase64: null
        //  },
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }]
    })
}