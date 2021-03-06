import { useState } from 'react';
import axios from 'axios';
import { isTemplateTail } from 'typescript';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface searchProps {
  searchValue: string;
  setSearchValue: any;
  resultsData: any;
  setResultsData: any;
  searchSubmitted: boolean;
  setSearchSubmitted: any;
  searchValueDisplay: string;
  setSearchValueDisplay: any;
}

export default function SearchBar(props: searchProps) {

  var parseString = require('xml2js').parseString;
  const handleSubmit = (event: any) => {
    props.setSearchValueDisplay(props.searchValue);
    var testArray: any = [];
    var testArray2: any = [];
    var testArrayMerged: any = [];
    props.setSearchSubmitted(true);
    const searchTerm: string = props.searchValue.replaceAll(' ', '+');
    console.log(
      `https://www.boardgamegeek.com/xmlapi2/search?query=${searchTerm}&type=boardgame`
    );
    const boardGameApi: string = `https://boardgamegeek.com/xmlapi2/search?query=${searchTerm}&type=boardgame`;
    event.preventDefault();
    axios.get(boardGameApi).then((response) => {
      parseString(response.data, function (err: any, result: any) {
        for (var i2 in result.items.item) {
          testArray.push(result.items.item[i2].name[0].$.value);
          testArray2.push(result.items.item[i2].$.id);
        }
        testArrayMerged = testArray.map((str: string, index: number) => ({
          name: str,
          id: testArray2[index],
        }));
        props.setResultsData(testArrayMerged);
        console.log(props.resultsData);
      });
    });
  };
  const handleChange = (inputType: string, event: any) => {
    if (inputType === 'searchValue') {
      props.setSearchValue(event.target.value);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <TextField
          className="input-field"
          label="Search for games"
          type="text"
          placeholder="Search for games by title."
          value={props.searchValue}
          onChange={(event) => handleChange('searchValue', event)}
          sx={{ width: 400, backgroundColor:"white" }}
        />
        <Button variant="contained" className="search-submit-button" type="submit" sx={{ marginLeft: 2, backgroundColor:"#334195" }}>
          Search
        </Button>
      </form>
    </div>
  );
}
