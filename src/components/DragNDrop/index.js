import React, {useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'

import { predict } from '../../util'

export default function DragNDrop(props) {
    
    const [file, setFile] = useState({name: null})
    const [isDroped, setDnD] = useState(false)
    const [isResultFound, setIsResultFound] = useState(false)
    const [results, setResults] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(() => {
        document.getElementsByTagName('link')[2].disabled = false; 
        if (isResultFound)
            props.onResults(results)
    })

    const handleError = (message) => {
        setErrorMessage(message)
    }

    const handleSubmit = (file) => {

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.addEventListener("load", async () => {
            let imageData = reader.result;
            imageData = imageData.replace(/^data:image\/(.*);base64,/, '')

            try {
                const {results} = await predict(imageData)

                const regions = results[0].outputs[0].data.regions.map(region => {
                    return region.data.concepts
                })

                const allConcepts = regions.flat()

                const sortedConcepts = allConcepts.sort((a, b) => b.value - a.value).slice(0, 20)

                setIsResultFound(true)
                setResults(sortedConcepts)
                
            } catch (error) {
                handleError('Whoops, magic broke :(. Try again.')
                console.log(error)
            }

        }, false);

    }

    

    const onDrop = useCallback(acceptedFiles => {
        handleSubmit(acceptedFiles[0])
        setFile(acceptedFiles[0])
        setDnD(true)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    if (file === null || file === undefined){
        return 
    }

    const renderSelectedFile = ({name}, isDroped) => (isDroped ? (
            <p>Selected file: {name}</p>
        ) : 
        (
            <p>Drop an image of any actor and magically get their movies</p>
        )
    )
    
    return (
        <div {...getRootProps()} style={{position: 'relative', top:0, bottom: 0}}>
            <input {...getInputProps()} />
            {
                
                React.Children.map(props.children, child => React.cloneElement(
                    child, 
                    {renderMessage: renderSelectedFile, isDroped, file, errorMessage}))
            }
        </div>
        )
}