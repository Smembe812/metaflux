import Clarifai from 'clarifai'
const CLARIFAI_API_KEY = '8c791222b3c64745baa10779ef5c61f9'

const app = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
});


const BASE_MOVIE_URL = `https://api.themoviedb.org/3/`
const MOVIE_API_KEY = `c22f13ad43c02a1a9d885bcfb01a9ad3`

export const predict = (data) => {
    return new Promise ((resolve, reject) => {
        app.workflow.predict('celebrity-af', {base64: data}).then(
            function(response){
                resolve(response)
            },
            function(err){
                reject(err)
            }
        );
    })
}

export const get = endpoint => {
    console.log(endpoint)
    return fetch(`${BASE_MOVIE_URL}${endpoint}api_key=${MOVIE_API_KEY}`,
        {
            method: 'GET'
        }
    )
    .then( async response => await response.json())
}

export const search = async endpoint => {
    try {
        const result = await get(`search/${endpoint}`)
        
        return await result
    } catch (error) {
        return await error
    }
}