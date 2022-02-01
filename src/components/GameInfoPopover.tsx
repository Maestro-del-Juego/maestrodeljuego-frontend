import { useEffect, useState } from 'react';
import axios from 'axios';
import WishlistButton from '../components/WishlistButton';
import CollectionButton from '../components/CollectionButton';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface gameInfoProps {
  token: string;
  user: string;
  gameId: number
}

export default function GameInfoPopover(props: gameInfoProps) {
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
      <h4 className="popover-pub-year">({pubYear})</h4>
      <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
      <div className="popover-players-playtime">
        <div className="popover-players">
            <GroupIcon sx={{ verticalAlign: "text-bottom" }}/> {minPlayers} - {maxPlayers} Players
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
      <WishlistButton
        token={props.token}
        gameId={props.gameId!} // ! is non-null assertion operator
        wishlisted={wishlisted}
        setWishlisted={setWishlisted}
        setOwned={setOwned}
      />
      <CollectionButton
        token={props.token}
        gameId={props.gameId!} // ! is non-null assertion operator
        owned={owned}
        setOwned={setOwned}
        setWishlisted={setWishlisted}
      />
    </div>
  );
}
