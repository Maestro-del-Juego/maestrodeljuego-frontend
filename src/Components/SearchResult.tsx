import { Link } from 'react-router-dom';

interface resultsProps {
    gameId: number;
    gameName: string;
}

export default function SearchResult(props: resultsProps) {
    return (
        <div className="search-result-card">
            <Link to={`/games/${props.gameId}`} key={props.gameId}>
            <div>{props.gameName}</div> </Link>
        </div>
    )
}