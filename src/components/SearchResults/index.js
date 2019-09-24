import React, {useState, useEffect} from 'react'

import Result from './result'
import Profile from '../Profile';
import Movies from '../Movies';


function SearchResults (props){

    const {results} = props
    const [selected, setSelected] = useState(null)
    const [movies, setMovies] = useState([])

    const handleSelect = (value) => {
        setSelected(value)
    }

    const loadMovies = (value) => {
        setMovies(value)
    }
    

    const renderResults = (results) => results.map(result => <Result key={result.name} onSelect={handleSelect} person={result}/>)

    if (!results) return

    if (selected) {
        return (
            <>
                <section className="hero-section py-3 bg-mate">
                    <div className="container py-5">
                        <div className="row py-5">
                            <Profile id={selected} getMovies={loadMovies}/>
                        </div>
                        {
                        movies ?
                        <div className="row py-5 text-center">
                            <h1 style={{margin: 'auto'}}>
                                <span>
                                    Movies
                                <i className="fas fa-chevron-down"></i>

                                </span>
                            </h1>
                        </div> : ''}
                    </div>
                </section>

                <Movies movies={movies}/>
            </>
        )
    }

    return (
        <section className="hero-section py-3 bg-mate">
            <div className="container py-5">
                <div className="row py-5">
                        <ul className="list-unstyled">
                            {renderResults(results)}
                        </ul>
                </div>
            </div>
        </section>
    )
}

export default SearchResults