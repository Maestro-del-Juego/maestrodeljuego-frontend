import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import OctoSearch from '../assets/OctoSearch.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function Search() {
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
        <Box sx={{ marginLeft: '60px' }}>
          {searchSubmitted !== false ? (
            <h3>Displaying search results for "{searchValueDisplay}"...</h3>
          ) : (
            ''
          )}
          <List>
          {resultsData.map(({ id, name }: any) => (
            <SearchResult key={id} gameId={id} gameName={name} />
          ))}
          </List>
        </Box>
        <img src={OctoSearch} alt="OctoSearch" id="octo-search"></img>
      </div>
    </>
  );
}
