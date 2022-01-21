import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
                    return Date.parse(b.date) - Date.parse(a.date); }); //sorts array by date, newest to oldest
                setGameNightList(gameNightArray);
            });
        }, [props.token]);
    return (
        <div className="game-night-menu-container">
            <Link className="new-event-link" to="/createevent/" key={"new-event-link"}>Create New Event</Link>
            <h4>Upcoming Game Nights</h4>
            {gameNightList.map((event) => (
                <>
                {moment(event.date).isBefore(moment()) === false ? (
                    <div className="game-night-event-container" key={`container-${event.pk}`} >
                        <Link className="event-link" to={`/game_night/${event.rid}/finalize`} key={`link-${event.pk}`}>
                            <div className="event-info-date-loc">{moment(event.date).format('MMM DD, YYYY')} @ {event.location}</div>
                            <div className="event-info-times">{moment(event.start_time, "HH.mm.ss").format("h:mm A")} - {moment(event.end_time, "HH.mm.ss").format("h:mm A")}</div>
                        </Link>
                    </div>) : (<></>)
                }
                </>
            ))}
            <h4>Past Game Nights</h4>
            {gameNightList.map((event) => (
                <>
                {moment(event.date).isBefore(moment()) ? (
                    <div className="game-night-event-container" key={`container-${event.pk}`} >
                        <Link className="event-link" to={`/game_night/${event.rid}/finalize`} key={`link-${event.pk}`}>
                            <div className="event-info-date-loc">{moment(event.date).format('MMM DD, YYYY')} @ {event.location}</div>
                            <div className="event-info-times">{moment(event.start_time, "HH.mm.ss").format("h:mm A")} - {moment(event.end_time, "HH.mm.ss").format("h:mm A")}</div>
                        </Link>
                    </div>) : (<></>)
                }
                </>
            ))}
        </div>
    )
}