import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function GameInfoPage() {
    let params = useParams()
    const [gameData, setGameData] = useState([])
    const [gameTitle, setGameTitle] = useState("")
    const [pubYear, setPubYear] = useState(null)
    const [minPlayers, setMinPlayers] = useState(null)
    const [maxPlayers, setMaxPlayers] = useState(null)
    const [playtime, setPlaytime] = useState(null)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        const gameUrl = `https://maestrodeljuego.herokuapp.com/games/${params.gameId}`
        axios
            .get(gameUrl)
            .then((response) => {
                setGameTitle(response.data.title)
                setPubYear(response.data.pub_year)
                setMinPlayers(response.data.min_players)
                setMaxPlayers(response.data.max_players)
                setPlaytime(response.data.playtime)
                setImageUrl(response.data.image)
                setGameData(response.data)
                console.log(response.data)
            })
    }, [params.gameId, gameTitle])

    return (
        <div>
            <h2>{gameTitle}</h2>
            <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
            <p>{pubYear}</p>
            <p>{minPlayers} - {maxPlayers} players</p>
            <p>Approximate playtime: {playtime} minutes</p>
        </div>
    )
}