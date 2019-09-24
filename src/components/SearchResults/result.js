import React, {useState, useEffect} from 'react'

import { search } from '../../util'

function Result ({person, onSelect}){
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    
    async function fetchPerson(){
        try {
            setLoading(true)
            const {results} = await search(`person/?query=${person.name}&append_to_response=movie_credits&`)
            results[0] ? setResult(results[0]) : new Error('Not found')
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect( () => {
        fetchPerson()
    }, [])

   
    let knowForDepartment, knownFor, image;

    function profileImage(path = null, name=null){
        if (path !== null){
            return `https://image.tmdb.org/t/p/w90_and_h90_face/${path}`
        }
        else{
            return `https://api.adorable.io/avatars/90/${name}.png`
        }
    }

    const handleSelect = (value) => {
        onSelect(value)
    }


    if (loading){
        return <i className="fas fa-magic animated infinite swing"></i>
    }

    if (result){

        image = profileImage(result.profile_path, result.name)
        const {known_for_department, known_for} = result

        knowForDepartment = known_for_department
        knownFor = ''

        for (let proj in known_for){
            knownFor += known_for[proj].title || known_for[proj].name
            knownFor += (proj < known_for.length - 1) ? ',   ' : ''
        }
        
    }
    else{
        return <></>
    }


    return (
        
        <li 
            onClick={() => handleSelect(result.id)}
            className="media result my-2 d-flex justify-content-center" >
            <img src={image} className="mr-3" alt="..."/>
            <div className="media-body">
                <h5 className="mt-0">{result? result.name : ''}</h5>
                {knowForDepartment} • {knownFor}
            </div>
        </li>
                           
    )
}

export default Result