import { Link } from 'react-router-dom';

interface gameProps {
  gameId: number;
  gameName: string;
  imageUrl: string;
  amountPlayed: number;
  // dateLastPlayed: string;
}

export default function LeastPlayed(props: gameProps) {
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
        <h5 id="times-played-name">{props.gameName}</h5>
      </Link>
      <h6 id="times-played">Times Played: {props.amountPlayed}</h6>
      {/* <h6>Date Last Played: {props.dateLastPlayed}</h6> */}
    </div>
  );
}
