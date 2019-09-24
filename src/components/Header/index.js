import React from 'react'

import { BrowserRouter as  Link } from "react-router-dom";

function Header({onHeaderClick}){
    const handleClick = () => {
        onHeaderClick(null)
    }

    return(
        <header className="bs">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/"><a className="navbar-brand" onClick={handleClick}>METAFLUX</a></Link>

                    <div className="navbar-nav w-100 justify-content-end">
                        <i className="fas fa-search result" onClick={handleClick}></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header