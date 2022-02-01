import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { useState } from 'react';
import Box from '@mui/material/Box';
import OctoSearch from '../assets/OctoSearch.png';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

interface searchProps {
    token: string;
    user: string;
  }

export default function Search(props: searchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [resultsData, setResultsData] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchValueDisplay, setSearchValueDisplay] = useState('');

  return (
    <>
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          resultsData={resultsData}
          setResultsData={setResultsData}
          searchSubmitted={searchSubmitted}
          setSearchSubmitted={setSearchSubmitted}
          searchValueDisplay={searchValueDisplay}
          setSearchValueDisplay={setSearchValueDisplay}
        />
      </Box>
      <div id="search-bottom">
        <Box sx={{display:"block", m:"auto", width:"80%", textAlign:"center", backgroundColor:"#F8F8F8"}}>
          <List subheader={
              <>
            {(searchSubmitted !== false) && (searchValueDisplay !== "") ? (<ListSubheader sx={{ fontSize: "x-large", textAlign:"center", backgroundColor:"#F8F8F8" }} component="div" id="search-results-subheader">
            Displaying search results for "{searchValueDisplay}"...
            </ListSubheader>) : (<ListSubheader sx={{ backgroundColor:"F8F8F8" }}></ListSubheader>) }
          
          </> }>
          {resultsData.map(({ id, name }: any) => (
            <SearchResult key={id} gameId={id} gameName={name} token={props.token} user={props.user}/>
          ))}
          </List>
        </Box>
        {resultsData.length === 0 ? (<img src={OctoSearch} alt="OctoSearch" id="octo-search"></img>) : (<></>)}
        
      </div>
    </>
  );
}
