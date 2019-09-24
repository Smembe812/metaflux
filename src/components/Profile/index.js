import React, {useState, useEffect} from 'react'
import {get} from '../../util'

function Profile ({id, getMovies}) {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    
    async function fetchPerson(){
        try {
            setLoading(true)
            const profile = await get(`person/${id}?append_to_response=movie_credits&`)
            profile ? setProfile(profile) : new Error('Not found')
            if(profile){
                getMovies(profile.movie_credits.cast)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect( () => {
        fetchPerson()
    }, [])


    function profileImage(path = null, name=null){
        if (path !== null){
            return `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${path}`
        }
        else{
            return `https://api.adorable.io/avatars/300/${name}.png`
        }
    }

    if (loading){
        return <i className="fas fa-magic animated infinite wobble"></i>
    }

    if(!profile) return <></>

    const image = profileImage(profile.profile_path, profile.name)

    return (
        <div className="profile-wrapper animated pulse">
            <div>
                <img src={image}className="mr-3" alt="..."/>
            </div>
            <div className="media-body">
                <h5 className="mt-0">{profile.name}</h5>
                <h6>Biography</h6>
                <p>
                    {profile.biography}
                </p>
            </div>
        </div>
    )
}

export default Profile