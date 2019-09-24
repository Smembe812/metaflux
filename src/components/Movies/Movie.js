import React, {useState, useEffect} from 'react'
import {get} from '../../util'

function Movies ({id, onClose}) {

    const [movie, setMovie] = useState(false)

    async function fetchMovie(){
        try {
            const profile = await get(`movie/${id}?append_to_response=videos&`)
            profile ? setMovie(profile) : new Error('Not found')
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect( () => {
        fetchMovie()
    }, [id])

    const handleOnClose = () => {
        setMovie(false)
        onClose(false)
    }

    const renderMovieDetails = () => {
        if (movie.videos.results.length > 1){
            const url = `https://www.youtube.com/embed/${movie.videos.results[0].key}?modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1`
            return (
                <>
                    <iframe width="420" title={movie.videos.results[0].name} height="345" src={url}></iframe>
                </>
            )

        }
    }

    if(!movie) return <></>

    return (
            <div>
                <a className="closebtn" onClick={handleOnClose}>&times;</a>
                <div className="container">
                    <h4>{movie.title}</h4>
                    <p className="lead">
                        Tagline: ${movie.tagline}<br/>
                        Budget: ${movie.budget}<br/>
                        Release date: {movie.release_date}
                    </p>
                </div>
                {renderMovieDetails()}
            </div>
        
    )
}

export default Movies