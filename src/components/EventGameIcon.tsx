interface gameInfoProps {
    gameTitle: string;
    imageUrl: string;
}

export default function EventGameIcon(props: gameInfoProps) {
    return (
        <>
            <img className="game-icon-image" src={props.imageUrl} alt={props.gameTitle}/>
            <h6 className="game-icon-title">{props.gameTitle}</h6>
        </>
    )
}