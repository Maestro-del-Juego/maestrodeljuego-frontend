interface resultsProps {
    gameId: number;
    gameName: string;
}

export default function SearchResult(props: resultsProps) {
    return (
        <div>{props.gameName}</div>
    )
}