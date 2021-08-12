import axios from 'axios';
import { useFormState } from 'react-hook-form';

const instance = axios.create({
    baseURL:' https://ghostmeme.api.hscc.bdpa.org/v1',
    headers: {
        'key': 'tc159313-1fa1-4cee-9fdd-984b925628bf',
    },
});

function generateReceivedUrl(userId){
    let myQueryObject = { "receiver": userId };
    let myQuery = encodeURIComponent(JSON.stringify(myQueryObject));
    return "/memes/search?match=" + myQuery;
}

function generateSentUrl(userId){
    let myQueryObject = { "owner": userId };
    let myQuery = encodeURIComponent(JSON.stringify(myQueryObject));
    return "/memes/search?match=" + myQuery;
}

function generateMentionsUrl(username){
    const myRegexQueryObject = {
        "description": "@" + username,
    }
    const myRegexQuery = encodeURIComponent(JSON.stringify(myRegexQueryObject))
    return "/memes/search?regexMatch=" + myRegexQuery
}

function generateCommentsUrl(memeIds){
    let myQueryObject = { "replyTo": memeIds.join('|') };
    let myQuery = encodeURIComponent(JSON.stringify(myQueryObject));
    return "/memes/search?regexMatch=" + myQuery;
}

function findPublicMemes() {
    let myQueryObject = { "private": false }
    let myQuery = encodeURIComponent(JSON.stringify(myQueryObject))
    let myURL = "/memes/search?match=" + myQuery
    return myURL;
}

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
    postNewMeme: (meme) =>
    instance({
        'method': 'POST',
        'url': '/memes',
        data: {
            owner: meme.owner,
            receiver: meme.receiver,
            expiredAt: meme.expiredAt,
            description: meme.description,
            private: true,
            replyTo: null,
            imageUrl: meme.imageUrl,
            imageBase64: meme.imageBase64,
        },
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            return json;
        }]
    }),
    getMemesReceivedByUser: (userId) =>
    instance({
        'method': 'GET',
        'url': generateReceivedUrl(userId),
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }]
    }),
    getMemesSentByUser: (userId) =>
        instance({
            'method': 'GET',
            'url': generateSentUrl(userId),
            transformResponse: [function (data) {
                const json = JSON.parse(data);
                console.log(json);
                return json;
            }]
        }),
    getAllUserMentions: (username) =>
    instance({
        'method': 'GET',
        'url': generateMentionsUrl(username),
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }]
    }),
    getAllCommentsOnMemes: (memeIds) =>
    instance({
        'method': 'GET',
        'url': generateCommentsUrl(memeIds),
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }]
    }),
    updateMeme: (memeId, expiredAt) =>
    instance({
        'method': 'PUT',
        'url': '/memes/' + memeId,
        data: {
            expiredAt: expiredAt
        },
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }]
    }),
    getPublicMemes: (memeId) =>
    instance({
        'method': 'GET',
        'url': findPublicMemes(memeId),
        transformResponse: [function (data) {
            const json = JSON.parse(data);
            console.log(json);
            return json;
        }]
    })
}
