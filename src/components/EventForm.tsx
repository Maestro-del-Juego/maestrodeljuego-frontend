import axios from 'axios';
import { useState } from 'react';
import { collectionObject } from '../routes/CreateEvent';
import { contactObject } from '../routes/CreateEvent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Popover, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

interface eventFormProps {
  collection: collectionObject[];
  setCollection: any;
  selectedGames: collectionObject[];
  setSelectedGames: any;
  contactList: contactObject[];
  setContactList: any;
  guestList: contactObject[];
  setGuestList: any;
  handleAddClick: any;
  handleRemoveClick: any;
  handleAddGuestClick: any;
  handleRemoveGuestClick: any;
  token: string;
}

export default function EventForm(props: eventFormProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);

  const [newContactFirst, setNewContactFirst] = useState('');
  const [newContactLast, setNewContactLast] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');

  const navigate: any = useNavigate();

  const handleSubmit = (event: any) => {
    const eventApi = 'https://maestrodeljuego.herokuapp.com/gamenight/';
    const gameSelectionArray: any = [];
    props.selectedGames.forEach((game) => gameSelectionArray.push(game.pk));
    const inviteesArray: any = [];
    props.guestList.forEach((guest) => inviteesArray.push(guest.pk));
    event.preventDefault();
    axios
      .post(
        eventApi,
        {
          date: date,
          invitees: inviteesArray,
          start_time: startTime,
          end_time: endTime,
          location: location,
          options: gameSelectionArray,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        alert('Game Night created!');
        console.log(response);
        navigate('/game_night/');
      });
  };

  const handleNewContactSubmit = (event: any) => {
    const contactApi = 'https://maestrodeljuego.herokuapp.com/contacts/';
    event.preventDefault();
    axios
      .post(
        contactApi,
        {
          first_name: newContactFirst,
          last_name: newContactLast,
          email: newContactEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        const tempArray = props.guestList;
        tempArray.push(response.data);
        props.setGuestList(tempArray);
        setUpdater(updater + 1);
        setNewContactFirst("");
        setNewContactLast("");
        setNewContactEmail("");
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
    if (inputType === 'newContactFirst') {
      setNewContactFirst(event.target.value);
      console.log(event.target.value);
    }
    if (inputType === 'newContactLast') {
      setNewContactLast(event.target.value);
      console.log(event.target.value);
    }
    if (inputType === 'newContactEmail') {
      setNewContactEmail(event.target.value);
      console.log(event.target.value);
    }
  };
  // variables for MUI dropdown menu: games
  const [gameAnchor, setGameAnchor] = useState<null | HTMLElement>(null);
  const openGameMenu = Boolean(gameAnchor);
  const handleGameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGameAnchor(event.currentTarget);
  };
  const handleGameClose = () => {
    setGameAnchor(null);
  };

  // variables for MUI dropdown menu: contacts
  const [contactAnchor, setContactAnchor] = useState<null | HTMLElement>(null);
  const openContactMenu = Boolean(contactAnchor);
  const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setContactAnchor(event.currentTarget);
  };
  const handleContactClose = () => {
    setContactAnchor(null);
  };

  // new contact MUI
  const [newContactAnchor, setNewContactAnchor] = useState<null | HTMLElement>(
    null
  );
  const handleNewContactClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNewContactAnchor(event.currentTarget);
  };
  const handleNewContactClose = () => {
    setNewContactAnchor(null);
  };
  const newContactOpen = Boolean(newContactAnchor);
  const newContactPopupId = newContactOpen ? 'new-contact-popup' : undefined;

  return (
    <>
      <div className="new-event-form-container">
        <form className="new-event-form" onSubmit={handleSubmit}>
          <TextField
            id="date-time-picker"
            label="Date"
            type="date"
            value={date}
            onChange={(event) => handleChange('date', event)}
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
            onChange={(event) => handleChange('startTime', event)}
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
            onChange={(event) => handleChange('endTime', event)}
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
            onChange={(event) => handleChange('location', event)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 300 }}
            />
        </form>
      </div>

      <div>
        <ButtonGroup className="contact-button-group" variant="contained" aria-label="outlined primary button group">
        <Button
          id="contact-menu-button"
          aria-controls={openContactMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openContactMenu ? 'true' : undefined}
          onClick={handleContactClick}
        >
          Add Contacts
        </Button>
        <Button
          aria-describedby={newContactPopupId}
          variant="contained"
          onClick={handleNewContactClick}
        >
          Create New Contact
        </Button>
        </ButtonGroup>
        <Menu
          id="game-menu"
          anchorEl={contactAnchor}
          open={openContactMenu}
          onClose={handleContactClose}
          MenuListProps={{ 'aria-labelledby': 'contact-menu-button' }}
        >
          {props.contactList.map((contact) => (
            <MenuItem
              key={`${contact.pk}-dropdown`}
              onClick={() => {
                props.handleAddGuestClick(contact);
                setUpdater(updater + 1);
                handleContactClose();
              }}
            >
              {contact.first_name} {contact.last_name}
            </MenuItem>
            // with image: <MenuItem key={`${game.pk}-dropdown`} onClick={() => {props.handleAddClick(game); setUpdater(updater + 1); handleGameClose();}}><img className="menu-image" src={game.image} alt={game.title}></img>{game.title}</MenuItem>
          ))}
        </Menu>
      </div>

      <div className="contact-form-popup-container">
        {/* <Button
          aria-describedby={newContactPopupId}
          variant="contained"
          onClick={handleNewContactClick}
        >
          Create New Contact
        </Button> */}
        <Popover
          id={newContactPopupId}
          open={newContactOpen}
          anchorEl={newContactAnchor}
          onClose={handleNewContactClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <form
            className="create-contact-form"
            onSubmit={handleNewContactSubmit}
          >
            <label className="form-label">First Name: </label>
            <input
              type="text"
              value={newContactFirst}
              onChange={(event) => handleChange('newContactFirst', event)}
            />
            <label className="form-label">Last Name: </label>
            <input
              type="text"
              value={newContactLast}
              onChange={(event) => handleChange('newContactLast', event)}
            />
            <label className="form-label">Email: </label>
            <input
              type="text"
              value={newContactEmail}
              onChange={(event) => handleChange('newContactEmail', event)}
            />
            <button className="submit-button">Add New Contact</button>
          </form>
        </Popover>
      </div>

      <div>
        <Button
          id="game-menu-button"
          aria-controls={openGameMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openGameMenu ? 'true' : undefined}
          onClick={handleGameClick}
          variant="contained" 
        >
          Select Games
        </Button>
        <Menu
          id="game-menu"
          anchorEl={gameAnchor}
          open={openGameMenu}
          onClose={handleGameClose}
          MenuListProps={{ 'aria-labelledby': 'game-menu-button' }}
        >
          {props.collection.map((game) => (
            <MenuItem
              key={`${game.pk}-dropdown`}
              onClick={() => {
                props.handleAddClick(game);
                setUpdater(updater + 1);
                handleGameClose();
              }}
            >
              {game.title}
            </MenuItem>
            // with image: <MenuItem key={`${game.pk}-dropdown`} onClick={() => {props.handleAddClick(game); setUpdater(updater + 1); handleGameClose();}}><img className="menu-image" src={game.image} alt={game.title}></img>{game.title}</MenuItem>
          ))}
        </Menu>
      </div>
      <div className="selected-games-container">
        <h3>Selected Games:</h3>
        {props.selectedGames.map((game) => (
          <div
            className="game-selection-container"
            key={`${game.pk}-selected-container`}
          >
            <img
              className="game-selection-image"
              key={`${game.pk}-selected-image`}
              src={game.image}
              alt={game.title}
            />
            <h6>{game.title}</h6>
            <button
              className="event-form-game-button"
              key={`${game.pk}-remove-game-button`}
              onClick={() => {
                props.handleRemoveClick(game);
                setUpdater(updater - 1);
              }}
            >
              Remove Game
            </button>
          </div>
        ))}

      </div>
      <div className="guest-list-container">
        <h3>Guest List:</h3>
        {props.guestList.map((guest) => (
          <div
            className="guest-container"
            key={`${guest.first_name}${guest.last_name}`}
          >
            {guest.first_name} {guest.last_name}
            <button
              className="guest-list-form-button"
              onClick={() => {
                props.handleRemoveGuestClick(guest);
                setUpdater(updater - 1);
              }}
            >
              Remove Guest
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
