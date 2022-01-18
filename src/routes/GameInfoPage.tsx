import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function GameInfoPage() {
    let params = useParams()
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
                console.log(response.data)
            })
    }, [params.gameId, gameTitle])

    return (
        <div className="game-info-card">
            <h2>{gameTitle}</h2>
            <h6>({pubYear})</h6>
            <img className="game-box-image" alt={gameTitle} src={imageUrl}></img>
            <p>{minPlayers} - {maxPlayers} Players | {playtime} Min Playtime</p>
            <button className="wishlist-button-add">Add to Wishlist</button>
            <button className="collection-button-add">Add to Collection</button>
        </div>
    )
}