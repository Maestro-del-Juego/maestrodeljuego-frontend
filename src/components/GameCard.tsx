import { Link } from 'react-router-dom';

interface gameProps {
  gameId: number;
  gameName: string;
  pubYear: string;
  imageUrl: string;
}

export default function GaemCard(props: gameProps) {
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
        <h2>{props.gameName}</h2>
      </Link>
      <h6>({props.pubYear})</h6>
    </div>
  );
}
