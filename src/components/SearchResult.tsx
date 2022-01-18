import { Link } from 'react-router-dom';

interface resultsProps {
    gameId: number;
    gameName: string;
}

export default function SearchResult(props: resultsProps) {
    return (
        <div className="search-result-card">
            <Link className="search-result-link" to={`/games/${props.gameId}`} key={props.gameId}>
                {props.gameName}
            </Link>
        </div>
    )
}