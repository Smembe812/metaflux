import React, {useState, useEffect} from 'react';

import './App.css';

import DragNDrop from './components/DragNDrop'
import DropElement from './components/DropElement'
import SearchResults from './components/SearchResults'
import Header from './components/Header';

function App(props) {
  const [results, setResults] = useState(null)

  const getResults = (results) => {
    setResults(results)
  }

  const handleHeaderClick = (value) => {
    setResults(null)
  }

  useEffect(()=>{
    //render when value of results change
  }, [results])

  return (
    <div className="App">
      {
        results === null ?
        <DragNDrop onResults={getResults}>
          <DropElement/>
        </DragNDrop>

        :
        <>
          <Header onHeaderClick={handleHeaderClick}/>
          <SearchResults results={results}/>
        </>
      }
    </div>
  );
}

export default App;
