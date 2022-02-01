import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WishlistButton from '../components/WishlistButton';
import CollectionButton from '../components/CollectionButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface gameInfoProps {
  token: string;
  user: string;
}

export default function GameInfoPage(props: gameInfoProps) {
  let params = useParams();
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
    const gameUrl = `https://maestrodeljuego.herokuapp.com/games/${params.gameId}`;
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
          setCategories(response.data.categories);
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
  }, [params.gameId, props.token]);

  return (
    <div className="game-info-card">
      <h2 className="info-page-title">{gameTitle}</h2>
      <h4 className="info-page-pub-year">({pubYear})</h4>
      <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
      <p>
        {minPlayers} - {maxPlayers} Players | {playtime} Min Playtime
      </p>
      <Box className="popover-categories" sx={{ marginBottom:2, marginTop:2 }}>
            <>
            {categories.map((category) => (
                <Chip label={category} key={category} sx={{marginLeft:"2px", marginRight:"2px"}}/>
            ))}
            </>
        </Box>
      <WishlistButton
        token={props.token}
        gameId={params.gameId!} // ! is non-null assertion operator
        wishlisted={wishlisted}
        setWishlisted={setWishlisted}
        setOwned={setOwned}
      />
      <CollectionButton
        token={props.token}
        gameId={params.gameId!} // ! is non-null assertion operator
        owned={owned}
        setOwned={setOwned}
        setWishlisted={setWishlisted}
      />
    </div>
  );
}
