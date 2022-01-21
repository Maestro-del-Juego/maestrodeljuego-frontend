import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WishlistButton from '../components/WishlistButton';
import CollectionButton from '../components/CollectionButton';

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
      <h2>{gameTitle}</h2>
      <h6>({pubYear})</h6>
      <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
      <p>
        {minPlayers} - {maxPlayers} Players | {playtime} Min Playtime
      </p>
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
