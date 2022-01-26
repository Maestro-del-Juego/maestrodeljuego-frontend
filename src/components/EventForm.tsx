import axios from 'axios';
import { useState } from 'react';
import { collectionObject } from '../routes/CreateEvent';
import { contactObject } from '../routes/CreateEvent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Popover, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import React from 'react';

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
        setNewContactFirst('');
        setNewContactLast('');
        setNewContactEmail('');
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
    <div className="new-event-form-container">
      <div>
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
          <Button
            sx={{ backgroundColor: "mediumseagreen", marginLeft: 3}}
            id="submit-game-night-button"
            onClick={(event) => handleSubmit(event)}
            variant="contained"
          >
          Create Game Night
        </Button>
        </form>
      </div>

      <div className="contact-button-group-container">
        <ButtonGroup
          className="contact-button-group"
          variant="contained"
          aria-label="outlined primary button group"
        >
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
            <TextField
            id="new-contact-first"
            label="First name"
            type="text"
            value={newContactFirst}
            onChange={(event) => handleChange('newContactFirst', event)}
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <TextField
            id="new-contact-last"
            label="Last name"
            type="text"
            value={newContactLast}
            onChange={(event) => handleChange('newContactLast', event)}
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <TextField
            id="new-contact-email"
            label="Email"
            type="text"
            value={newContactEmail}
            onChange={(event) => handleChange('newContactEmail', event)}
            sx={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <Button variant="contained" onClick={(event) => handleNewContactSubmit(event)} className="submit-button">Add New Contact</Button>
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
      <div className="games-guests-container">
        <div className="guest-picker-container">
          <List
            sx={{ minWidth: 240 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16 }}>Guest List</ListSubheader>
            }
          >
            {props.guestList.map((guest) => (
              <React.Fragment key={`${guest.first_name}${guest.last_name}`}>
                <Divider />
                <ListItem
                  secondaryAction={
                    <IconButton
                      className="guest-list-delete-button"
                      onClick={() => {
                        props.handleRemoveGuestClick(guest);
                        setUpdater(updater - 1);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${guest.first_name} ${guest.last_name}`}
                    secondary={`${guest.email}`}
                  ></ListItemText>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
        <div className="game-picker-container">
          <List
            sx={{ maxWidth: 500 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16 }}>Game List</ListSubheader>
            }
          >
            {props.selectedGames.map((game) => (
              <React.Fragment key={`${game.pk}-selected-container`}>
                <Divider />
                <ListItem
                  secondaryAction={
                    <IconButton
                      className="game-list-delete-button"
                      onClick={() => {
                        props.handleRemoveClick(game);
                        setUpdater(updater - 1);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
