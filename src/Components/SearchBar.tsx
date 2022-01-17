import { useState } from "react"
import axios from 'axios'
import { isTemplateTail } from "typescript";
var parseString = require('xml2js').parseString;

interface searchProps {
    searchValue: string;
    setSearchValue: any;
    resultsData: any;
    setResultsData: any;
    searchSubmitted: boolean;
    setSearchSubmitted: any;
}

export default function SearchBar(props: searchProps) {
    const handleSubmit = (event: any) => {
        var testArray: any = []
        var testArray2: any = []
        var testArrayMerged: any = []
        var arrayfromxml: any = []
        props.setSearchSubmitted(true);
        const searchTerm: string = props.searchValue.replaceAll(' ','+')
        console.log(`https://www.boardgamegeek.com/xmlapi2/search?query=${searchTerm}&type=boardgame`)
        const boardGameApi: string = `https://www.boardgamegeek.com/xmlapi2/search?query=${searchTerm}&type=boardgame`;
        event.preventDefault();
        axios
            .get(boardGameApi)
            .then((response) => {
                parseString(response.data, function(err: any, result: any) {
                    // console.log(result.items.item[0].name[0].$.value);
                    // console.log(result.items.item[0].yearpublished[0].$.value);
                    // console.log(result.items.item[0].$.id);
                    // console.log(result.items)
                    for(var i2 in result.items.item)
                        {testArray.push(result.items.item[i2].name[0].$.value)
                        testArray2.push(result.items.item[i2].$.id) }
                    // console.log(testArray)
                    // console.log(testArray2)
                    testArrayMerged = testArray.map((str: string, index: number) => ({name: str, id: testArray2[index]}))
                    // console.log(testArrayMerged)
                    props.setResultsData(testArrayMerged)
                    console.log(props.resultsData)
                })
            })   
    }
    const handleChange = (inputType: string, event: any) => {
        if (inputType === 'searchValue') {
            props.setSearchValue(event.target.value)
        }
    }

    return (
        <div className="search-bar-container">
        <form className="search-bar" onSubmit={handleSubmit}>
            <label className="search-label">Search for games: </label>
            <input
                className="input-field"
                type="text"
                placeholder="Please enter your search terms here."
                value={props.searchValue}
                onChange={(event) => handleChange('searchValue', event)}
            />
            <button className='submit-button'>Search</button>
        </form>
        </div>
    )
}