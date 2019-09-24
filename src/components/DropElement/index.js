import React from 'react'

function DropElement ({renderMessage, isDroped, file, errorMessage}){
    
    const renderProgressMessage = () => {

        if (errorMessage !== null)
            return errorMessage
        else   
            return 'Working some magic...'
    }
    return(
        <section className="hero-section py-5">
          <div className="container py-5">
              <div className="row py-5">
                  
                  <div className="col-lg-12 d-flex align-items-center justify-content-center">
                    <div>
                      <h1 className="display-2 re-font-size text-center">MetaFlux</h1>
                      <div className="lead">
                          {renderMessage(file, isDroped)}
                      </div>
                    </div>

                    
                  </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center">
                  <h1 className="display-2"> 
                        {   isDroped ?
                            <i className="fas fa-magic animated infinite swing"></i> :
                            <i className="fas fa-upload"></i>
                        }
                  </h1>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center">

                {
                    isDroped ?
                    <span>{renderProgressMessage()}</span> :
                    (<>
                        <label htmlFor="file"><strong>Choose a file</strong><span> or drag it here</span>.</label>
                    
                        <button className="input-submit" type="submit">Upload</button>
                    </>)
                }
              </div>
          </div>
        </section>
    )
}

export default DropElement