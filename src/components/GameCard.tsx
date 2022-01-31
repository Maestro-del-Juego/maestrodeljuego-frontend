import { Link } from 'react-router-dom';

interface gameProps {
  gameId: number;
  gameName: string;
  pubYear: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  playtime: number;
}

export default function GameCard(props: gameProps) {
  return (
    <div className="game-info-card">
      <img
        className="game-box-image"
        alt={props.gameName}
        src={props.imageUrl}
      ></img>
      <Link
        className="search-result-link"
        to={`/games/${props.gameId}`}
        key={props.gameId}
      >
        <h5>{props.gameName}</h5>
      </Link>
    </div>
  );
}
