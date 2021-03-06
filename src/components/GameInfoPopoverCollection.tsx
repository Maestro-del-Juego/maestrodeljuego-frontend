import { useEffect, useState } from 'react';
import axios from 'axios';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface gameInfoProps {
  token: string;
  user: string;
  gameId: number
}

export default function GameInfoPopoverCollection(props: gameInfoProps) {
  const [gameTitle, setGameTitle] = useState('');
  const [pubYear, setPubYear] = useState(null);
  const [minPlayers, setMinPlayers] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const [playtime, setPlaytime] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [owned, setOwned] = useState(false);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const gameUrl = `https://maestrodeljuego.herokuapp.com/games/${props.gameId}`;
    if (props.token !== '') {
      axios
        .get(gameUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        })
        .then((response) => {
          setGameTitle(response.data.title);
          setPubYear(response.data.pub_year);
          setMinPlayers(response.data.min_players);
          setMaxPlayers(response.data.max_players);
          setPlaytime(response.data.playtime);
          setImageUrl(response.data.image);
          setWishlisted(response.data.wishlisted);
          setOwned(response.data.owned);
          setCategories(response.data.categories)
          console.log(response.data);
        });
    } else {
      axios.get(gameUrl).then((response) => {
        setGameTitle(response.data.title);
        setPubYear(response.data.pub_year);
        setMinPlayers(response.data.min_players);
        setMaxPlayers(response.data.max_players);
        setPlaytime(response.data.playtime);
        setImageUrl(response.data.image);
        setWishlisted(response.data.wishlisted);
        setOwned(response.data.owned);
        console.log(response.data);
      });
    }
  }, [props.gameId, props.token]);

  return (
    <div className="game-popover-card">
      <h2 className="popover-title">{gameTitle}</h2>
      <h5 className="popover-pub-year">({pubYear})</h5>
      <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
      <div className="popover-players-playtime">
        <div className="popover-players">
            <GroupsIcon sx={{ verticalAlign: "text-bottom" }}/> {minPlayers} - {maxPlayers} Players
        </div>
        <div className="popover-playtime">
            <AccessTimeIcon sx={{ verticalAlign: "text-bottom" }}/> {playtime} Min Playtime
        </div>
      </div>
      <Box className="popover-categories" sx={{ marginBottom:2, marginTop:2 }}>
            <>
            {categories.map((category) => (
                <Chip label={category} key={category} sx={{marginLeft:"2px", marginRight:"2px"}}/>
            ))}
            </>
        </Box>
    </div>
  );
}
