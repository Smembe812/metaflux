import React, {useState, useEffect} from 'react'

import Movie from './Movie'

function Movies ({movies}) {

    const [show, setShow] = useState(false)
    const [movieId, setMovieId] = useState(null)

    useEffect(() => {
        console.log(document.getElementsByTagName('link')[2])
        document.getElementsByTagName('link')[2].disabled = true; 
    }, [movieId])

    /**
     * renders movies in grid
     * @param {*} movies 
     */
    const renderMovies = (movies) => {
        return movies
        .sort((a, b) => b.popularity - a.popularity) //sort movies based on popularity
        .map(movie => {
            const poster = posterImage(movie.poster_path, movie.title)

            return (
                <div className="movie" key={movie.title}>
                    <img src={poster} alt={movie.title} title={movie.title} onClick={() => handleSelectMovie(movie.id) }/>
                </div>
            )
        })
        
    }

    function posterImage(path = null, name=null){
        if (path !== null){
            return `https://image.tmdb.org/t/p/w150_and_h225_bestv2/${path}`
        }
        else{
            return `https://api.adorable.io/avatars/150/${name}.png`
        }
    }

    /**
     * set selected movie id and open sidebar
     * @param {number} value 
     */
    const handleSelectMovie = (value) => {
        setShow(true)
        setMovieId(value)
    }

    const handleOnClose = (value) => {
        setShow(false)
    }

    return (
         <section className="known-for bg-mate animated pulse">
                
            <div className="container">
                <div className="movies">
                    {renderMovies(movies)}
                </div>
            </div>
            <div id="mySidenav" className="side__nav" style={{width: show ? '400px' : '0'}}>
                <a className="closebtn" onClick={() => setShow(false)}>&times;</a>
                { movieId ? <Movie id={movieId} onClose={handleOnClose}/> : <></>}
            </div>
        </section>
        
    )
}

export default Movies