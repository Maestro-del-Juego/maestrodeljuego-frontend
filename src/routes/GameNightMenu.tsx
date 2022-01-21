import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface gameNightProps {
    token: string;
}

interface gameNightObject {
    pk: number;
    rid: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
}

export default function GameNightMenu(props: gameNightProps) {
    const [gameNightList, setGameNightList] = useState<gameNightObject[]>([]);
    // const gameNightArray = {} as gameNightObject;
    useEffect(() => {
        const gameNightUrl = `https://maestrodeljuego.herokuapp.com/auth/users/me`;
        axios
            .get(gameNightUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${props.token}`,
                  },
            })
            .then((response) => {
                console.log(response.data.gamenights)
                setGameNightList(response.data.gamenights)
                const gameNightArray: Array<gameNightObject> = []
                response.data.gamenights.forEach((entry: any) => {
                    const entryObject: gameNightObject =
                    {pk:entry.pk, rid:entry.rid, date:entry.date, start_time:entry.start_time, end_time:entry.end_time, location:entry.location};
                    gameNightArray.push(entryObject)
                })
                gameNightArray.sort(function(a,b) {
                    return Date.parse(b.date) - Date.parse(a.date); });
                console.log(gameNightArray)
                setGameNightList(gameNightArray);
            });
        }, [props.token]);
        console.log(gameNightList)
    return (
        <>
            <Link to="/createevent/">Create New Event</Link>
            <h5>Upcoming Game Nights</h5>
            {gameNightList.map((event) => (
                <div>{event.location}</div>
            ))}
            <h5>Past Game Nights</h5>
        </>
    )
}