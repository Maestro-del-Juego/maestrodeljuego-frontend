import SearchBar from "../components/SearchBar"
import SearchResult from "../components/SearchResult"
import { useState } from "react"

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [resultsData, setResultsData] = useState([])
    const [searchSubmitted, setSearchSubmitted] = useState(false)

    return (
        <>
        <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            resultsData={resultsData}
            setResultsData={setResultsData}
            searchSubmitted={searchSubmitted}
            setSearchSubmitted={setSearchSubmitted}
        />
        {(searchSubmitted !== false) ?
            <h3>Displaying search results for "{searchValue}"...</h3>
            : ''}
        {resultsData.map(({id, name}: any) => (
        <SearchResult
            gameId={id}
            gameName={name}
        />
        ))}

        </>
    )
}