import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { IconButton, Popover, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface gameNightProps {
  token: string;
}

interface gameObject {
  bgg: number;
  image: string;
  pk: number;
  pub_year: number;
  title: string;
  votes: number;
}

interface inviteeObject {
  pk: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface rsvpObject {
  invitee: string;
  attending: boolean;
}

export default function GameNightOwnerView(props: gameNightProps) {
  const [gameList, setGameList] = useState<gameObject[]>([]);
  const [selectedGameList, setSelectedGameList] = useState<gameObject[]>([]);
  const [inviteeList, setInviteeList] = useState<inviteeObject[]>([]);
  const [rsvpList, setRsvpList] = useState<rsvpObject[]>([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);
  const [status, setStatus] = useState('');
  let { gameNightId } = useParams();
  const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/${gameNightId}`;
  useEffect(() => {
    axios
      .get(gameNightUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${props.token}`,
        },
      })
      .then((response) => {
        setDate(response.data.date);
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setLocation(response.data.location);
        setSelectedGameList(response.data.games);
        setStatus(response.data.status);
        setInviteeList(response.data.invitees);
        // setRsvpList(response.data.rsvps);
        let tempArray = response.data.options.sort((a: any, b: any) =>
          a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0
        );
        setGameList(tempArray);
        let rsvpTempArray = response.data.rsvps.sort((a: any, b: any) => a.attending > b.attending ? -1 : a.attending < b.attending ? 1 : 0)
        setRsvpList(rsvpTempArray);
        console.log(response.data);
      });
  }, [props.token, gameNightUrl]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .patch(
        gameNightUrl,
        {
          date: date,
          start_time: startTime,
          end_time: endTime,
          location: location,
          games: selectedGameList,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStatus(response.data.status);
        setUpdater(updater + 1);
        console.log(selectedGameList);
      });
  };

  const cancelGameNight = () => {
    axios
      .patch(
        gameNightUrl,
        {
          status: 'Cancelled',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStatus(response.data.status);
        setUpdater(updater - 1);
      });
  };

  const finalizeGameNight = () => {
    axios
      .patch(
        gameNightUrl,
        {
          date: date,
          start_time: startTime,
          end_time: endTime,
          location: location,
          games: selectedGameList,
          status: 'Finalized',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStatus(response.data.status);
        setUpdater(updater + 1);
      });
  };

  const reopenGameNight = () => {
    axios
      .patch(
        gameNightUrl,
        {
          date: date,
          start_time: startTime,
          end_time: endTime,
          location: location,
          games: selectedGameList,
          status: 'Voting',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStatus(response.data.status);
        setUpdater(updater + 1);
      });
  };

  const handleChange = (inputType: any, event: any) => {
    if (inputType === 'date') {
      setDate(event.target.value);
      console.log(event.target.value);
    }
    if (inputType === 'startTime') {
      setStartTime(event.target.value);
      console.log(event.target.value);
    }
    if (inputType === 'endTime') {
      setEndTime(event.target.value);
      console.log(event.target.value);
    }
    if (inputType === 'location') {
      setLocation(event.target.value);
      console.log(event.target.value);
    }
  };

  const handleAddClick = (game: gameObject) => {
    let array = selectedGameList;
    if (array.includes(game) === false) {
      array.push(game);
    }
    setSelectedGameList(array);
    console.log(selectedGameList);
  };

  const handleRemoveClick = (game: gameObject) => {
    let array = selectedGameList;
    array.splice(array.indexOf(game), 1);
    setSelectedGameList(array);
  };

  return (
    <>
      <div className="gn-owner-view-container">
        {status === 'Voting' ? (
          <form className="edit-gn-form">
            <TextField
              id="date-time-picker"
              label="Date"
              type="date"
              value={date}
              onChange={(event) => {
                if (status === 'Voting') handleChange('date', event);
              }}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="start-time-picker"
              label="Start time"
              type="time"
              value={startTime}
              onChange={(event) => {
                if (status === 'Voting') handleChange('startTime', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
            <TextField
              id="end-time-picker"
              label="End time"
              type="time"
              value={endTime}
              onChange={(event) => {
                if (status === 'Voting') handleChange('endTime', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
            <TextField
              id="location-picker"
              label="Location"
              type="text"
              value={location}
              onChange={(event) => {
                if (status === 'Voting') handleChange('location', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 300 }}
            />
            <Button
              sx={{ marginLeft: 2}}
              className="submit-button"
              variant="contained"
              onClick={(event) => handleSubmit(event)}
            >
              Submit Changes
            </Button>
          </form>
        ) : (
          <form className="edit-gn-form">
            <TextField
              disabled
              id="date-time-picker"
              label="Date"
              type="date"
              value={date}
              onChange={(event) => {
                if (status === 'Voting') handleChange('date', event);
              }}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              disabled
              id="start-time-picker"
              label="Start time"
              type="time"
              value={startTime}
              onChange={(event) => {
                if (status === 'Voting') handleChange('startTime', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
            <TextField
              disabled
              id="end-time-picker"
              label="End time"
              type="time"
              value={endTime}
              onChange={(event) => {
                if (status === 'Voting') handleChange('endTime', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
            <TextField
              disabled
              id="location-picker"
              label="Location"
              type="text"
              value={location}
              onChange={(event) => {
                if (status === 'Voting') handleChange('location', event);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 300 }}
            />
            <Button
              sx={{ marginLeft: 2}}
              disabled
              className="submit-button"
              variant="contained"
              onClick={(event) => handleSubmit(event)}
            >
              Submit Changes
            </Button>
          </form>
        )}

      <div className="finalize-cancel-buttons-container">
        {status === 'Voting' ? (
          <Button
            className="finalize-button"
            variant="contained"
            sx={{ backgroundColor: 'mediumseagreen' }}
            onClick={() => {
              finalizeGameNight();
            }}
          >
            Finalize Game Night
          </Button>
        ) : (
          <>
            {status === 'Finalized' ? (
              <Button
                className="reopen-button"
                variant="contained"
                onClick={() => {
                  reopenGameNight();
                }}
              >
                Reopen Game Night
              </Button>
            ) : (
              <Button
                sx={{ marginLeft: 2}}
                className="reopen-button-disabled"
                variant="contained"
                disabled
              >
                Reopen Game Night
              </Button>
            )}
          </>
        )}
        {status !== 'Cancelled' ? (
          <Button
            className="cancel-button"
            variant="contained"
            sx={{ backgroundColor: 'crimson', marginLeft: 1 }}
            onClick={() => {
              cancelGameNight();
            }}
          >
            Cancel Game Night
          </Button>
        ) : (
          <Button
            sx={{ marginLeft: 2}}
            className="cancel-button-disabled"
            variant="contained"
            disabled
          >
            Cancel Game Night
          </Button>
        )}
      </div>
      <div className="voting-and-rsvp-container">
        <div className="voting-results-container">
          <List
            sx={{ maxWidth: 500 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16 }}>
                Select games to be played:
              </ListSubheader>
            }
          >
            {gameList.map((game) => (
              <React.Fragment key={`voting-results-${game.pk}`}>
                <Divider />
                {selectedGameList.includes(game) === false ? (
                  <ListItem
                    secondaryAction={
                      <>
                        {status === 'Voting' ? (
                          <IconButton
                            className="voting-results-add-button"
                            onClick={() => {
                              handleAddClick(game);
                              setUpdater(updater + 1);
                            }}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            className="voting-results-add-button-disabled"
                            disabled
                          >
                            <AddBoxIcon />
                          </IconButton>
                        )}
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        className="game-selection-image"
                        variant="square"
                        src={game.image}
                        alt={game.title}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="game-picker-title"
                      primary={game.title}
                      secondary={`Vote score: ${game.votes}`}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                    sx={{ backgroundColor: 'powderblue' }}
                    secondaryAction={
                      <>
                        {status === 'Voting' ? (
                          <IconButton
                            className="voting-results-remove-button"
                            onClick={() => {
                              handleRemoveClick(game);
                              setUpdater(updater + 1);
                            }}
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            className="voting-results-remove-button-disabled"
                            disabled
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        )}
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        className="game-selection-image"
                        variant="square"
                        src={game.image}
                        alt={game.title}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="game-picker-title"
                      primary={game.title}
                      secondary={`Vote score: ${game.votes}`}
                    />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </div>

        <div className="rsvp-container">
          <List
            sx={{ maxWidth: 300 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16 }}>RSVPs:</ListSubheader>
            }
          >
            {rsvpList.map((rsvp) => (
              <React.Fragment key={`invitee-${rsvp.invitee}`}>
                <Divider />
                {rsvp.attending === true ? (
                  <ListItem>
                    <ListItemText
                      primary={rsvp.invitee}
                      secondary="attending"
                    />
                  </ListItem>
                ) : (
                  <ListItem sx={{ backgroundColor: "gainsboro" }}>
                    <ListItemText
                      primary={rsvp.invitee}
                      secondary="not attending"
                    />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>
      </div>
    </>
  );
}
