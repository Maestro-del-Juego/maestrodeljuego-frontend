import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';

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
    status: string;
}


export default function GameNightMenu(props: gameNightProps) {
    const [gameNightList, setGameNightList] = useState<gameNightObject[]>([]);
    const [showPast, setShowPast] = useState(false);
    const [showCancelled, setShowCancelled] = useState(false);
    useEffect(() => {
        if (props.token !== "") {
        const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/`;
        axios
            .get(gameNightUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${props.token}`,
                  },
            })
            .then((response) => {
                console.log(response)
                setGameNightList(response.data)
                const gameNightArray: Array<gameNightObject> = []
                response.data.forEach((entry: any) => {
                    const entryObject: gameNightObject =
                    {pk:entry.pk, rid:entry.rid, date:entry.date, start_time:entry.start_time, end_time:entry.end_time, location:entry.location, status: entry.status};
                    gameNightArray.push(entryObject)
                })
                gameNightArray.sort(function(a,b) {
                    return Date.parse(b.date) - Date.parse(a.date); }); //sorts array by date, newest to oldest
                setGameNightList(gameNightArray);
            });
        }}, [props.token]);

        const copyToClipboard = (url: string) => {
            const copyText = url;
            navigator.clipboard.writeText(copyText);
        }

    return (
        <>
        {props.token !== "" ? (
        <div className="game-night-menu-container">
            <Link className="new-event-link" to="/createevent/">Create New Event</Link>
            <List
                sx={{ maxWidth: 500}}
                subheader={<ListSubheader>Upcoming Game Nights</ListSubheader>}
            >
            {gameNightList.map((event) => (
                <React.Fragment key={`upcoming-${event.pk}`}>
                {(moment(event.date).isBefore(moment()) === false && event.status !== "Cancelled") ? (
                    <>
                        <Divider />
                        <ListItem
                            secondaryAction={<><Link to={`/game_night/${event.rid}/finalize`}><IconButton><EditIcon /></IconButton></Link>
                                <IconButton onClick={() => copyToClipboard(`${window.location.href}/${event.rid}`)}><ContentPasteIcon /></IconButton></>}
                        >
                            <ListItemAvatar>
                                {event.status==="Finalized" ? (
                                    <Avatar sx={{bgcolor:"mediumseagreen"}}><CheckCircleIcon /></Avatar>
                                ) : (
                                    <Avatar sx={{bgcolor:"gold"}}><PendingIcon /></Avatar>
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${moment(event.date).format('MMM DD, YYYY')} @ ${event.location}`}
                                secondary={`${moment(event.start_time, "HH.mm.ss").format("h:mm A")} - ${moment(event.end_time, "HH.mm.ss").format("h:mm A")}`}    
                            />
                        </ListItem>                       
                    </>) :(<></>)
                }
                </React.Fragment>
            ))}
            </List>
            {showPast===false ? (
            <h4>Past Game Nights <button onClick={() => setShowPast(true)}>Show</button></h4>
            ) : (
                <h4>Past Game Nights <button onClick={() => setShowPast(false)}>Hide</button></h4>
            )}
            {gameNightList.map((event) => (
                <React.Fragment key={`past-${event.pk}`}>
                {(moment(event.date).isBefore(moment()) && event.status !== "Cancelled" && showPast===true) ? (
                    <div className="game-night-event-container">
                            <div className="event-info-date-loc">{moment(event.date).format('MMM DD, YYYY')} @ {event.location}</div>
                            <div className="event-info-times">{moment(event.start_time, "HH.mm.ss").format("h:mm A")} - {moment(event.end_time, "HH.mm.ss").format("h:mm A")}</div>
                            <Link className="event-link" to={`/game_night/${event.rid}/finalize`}>View Event</Link>
                    </div>) : (<></>)
                }
                </React.Fragment>
            ))}
            {showCancelled===false ? (
            <h4>Cancelled Game Nights <button onClick={() => setShowCancelled(true)}>Show</button></h4>
            ) : (
                <h4>Cancelled Game Nights <button onClick={() => setShowCancelled(false)}>Hide</button></h4>
            )}
            {gameNightList.map((event) => (
                <React.Fragment key={`cancelled-${event.pk}`}>
                {event.status === "Cancelled" && showCancelled===true ? (
                <div className="game-night-event-container">
                    <div className="event-info-date-loc">{moment(event.date).format('MMM DD, YYYY')} @ {event.location}</div>
                    <div className="event-info-times">{moment(event.start_time, "HH.mm.ss").format("h:mm A")} - {moment(event.end_time, "HH.mm.ss").format("h:mm A")}</div>
                    <Link className="event-link" to={`/game_night/${event.rid}/finalize`}>View Event</Link>
                </div>
                ) : (<></>)
                }
                </React.Fragment>
            ))}
        </div>
        ) : (<><h4>Please log in to see your game night events.</h4></>)
        }</>
    )
}