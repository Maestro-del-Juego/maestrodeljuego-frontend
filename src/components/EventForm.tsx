import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { collectionObject, contactObject } from '../routes/CreateEvent';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, ButtonGroup, Menu, MenuItem, List, ListItem, ListItemText, ListSubheader,
  ListItemAvatar, Avatar, ListItemIcon, IconButton, Popover, Divider} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
  const [date, setDate] = useState(`${moment().format("yyyy-MM-DD")}`);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);
  const [newContactFirst, setNewContactFirst] = useState('');
  const [newContactLast, setNewContactLast] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  // Validation variables:
  const [startTimeValid, setStartTimeValid] = useState<Boolean>(false);
  const [endTimeValid, setEndTimeValid] = useState<Boolean>(false);
  const [dateValid, setDateValid] = useState<Boolean>(false);
  const [locationValid, setLocationValid] = useState<Boolean>(false);
  const [guestsValid, setGuestsValid] = useState<Boolean>(false);
  const [gamesValid, setGamesValid] = useState<Boolean>(false);
  const [contactFirstValid, setContactFirstValid] = useState<Boolean>(false);
  const [contactLastValid, setContactLastValid] = useState<Boolean>(false);
  const [contactEmailValid, setContactEmailValid] = useState<Boolean>(false);

  const navigate: any = useNavigate();

  const handleSubmit = (event: any) => {
    const eventApi = 'https://maestrodeljuego.herokuapp.com/gamenight/';
    const gameSelectionArray: any = [];
    props.selectedGames.forEach((game) => gameSelectionArray.push(game.pk));
    const inviteesArray: any = [];
    props.guestList.forEach((guest) => inviteesArray.push(guest.pk));
    event.preventDefault();
    if (validateForm()===true) {
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
        console.log(response);
        navigate(`/game_night`);
      });
    }
    else {handleValidatorClick(event)}
  };

  const validateForm = useCallback(() => {
    const timeRGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    setStartTimeValid(timeRGEX.test(startTime));
    setEndTimeValid(timeRGEX.test(endTime));
    const dateRGEX = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    setDateValid(dateRGEX.test(date) && moment(date).isSameOrAfter(moment().format("yyyy-MM-DD")));
    setLocationValid(location !== "");
    setGuestsValid(props.guestList.length > 0);
    setGamesValid(props.selectedGames.length > 0)
    if (startTimeValid===true && endTimeValid===true && dateValid===true &&
        locationValid===true && guestsValid===true && gamesValid===true) {
          // setIsFormValid(true);
          return true;
        }
  }, [date, dateValid, endTime, endTimeValid, gamesValid, guestsValid, location, locationValid, props.guestList.length, props.selectedGames.length, startTime, startTimeValid]);

  useEffect(() => {
    validateForm();
  }, [validateForm])

  const validateContact = useCallback(() => {
    // Regex courtsey of emailregex.com
    const emailRGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    setContactEmailValid(emailRGEX.test(newContactEmail));
    setContactFirstValid(newContactFirst !== "");
    setContactLastValid(newContactLast !== "");
    if (contactEmailValid===true && contactFirstValid===true && contactLastValid===true) {
      return true;
    }
  }, [newContactEmail, contactEmailValid, newContactFirst, contactFirstValid, newContactLast, contactLastValid])

  useEffect(() => {
    validateContact();
  }, [validateContact])

  // const validateStartTime = () => {
  //   const timeRGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  //   if (timeRGEX.test(startTime)) {return true} else return false;
  // }

  const handleNewContactSubmit = (event: any) => {
    const contactApi = 'https://maestrodeljuego.herokuapp.com/contacts/';
    event.preventDefault();
    if (validateContact()===true) {
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
        let tempArray2 = props.contactList;
        tempArray2.push(response.data)
        tempArray2 = tempArray2.sort((a: any, b: any) => a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : 0)
        props.setContactList(tempArray2);
        setUpdater(updater + 1);
        setNewContactFirst('');
        setNewContactLast('');
        setNewContactEmail('');
        handleNewContactClose();
      });
  }
  else {handleContactValidatorClick(event)}
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
  const handleGameClick = (event: any) => {
    setGameAnchor(event.currentTarget);
  };
  const handleGameClose = () => {
    setGameAnchor(null);
  };

  // variables for MUI dropdown menu: contacts
  const [contactAnchor, setContactAnchor] = useState<null | HTMLElement>(null);
  const openContactMenu = Boolean(contactAnchor);
  const handleContactClick = (event: any) => {
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

  // validation MUI
  const [validationAnchor, setValidationAnchor] = useState(null)
  const handleValidatorClick = (event: any) => {
    setValidationAnchor(event.currentTarget);
  }
  const handleValidatorClose = () => {
    setValidationAnchor(null);
  }
  const validationOpen = Boolean(validationAnchor);
  const validationId = validationOpen ? "validation-popover" : undefined;

  // new contact validation MUI
  const [contactValidationAnchor, setContactValidationAnchor] = useState(null)
  const handleContactValidatorClick = (event: any) => {
    setContactValidationAnchor(event.currentTarget);
  }
  const handleContactValidatorClose = () => {
    setContactValidationAnchor(null);
  }
  const contactValidationOpen = Boolean(contactValidationAnchor);
  const contactValidationId = contactValidationOpen ? "contact-validation-popover" : undefined;

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
            sx={{ minWidth: 220, m:2 }}
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
            sx={{ minWidth: 150, m:2 }}
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
            sx={{ minWidth: 150, m:2 }}
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
            inputProps={{ maxLength: 70}}
            sx={{ minWidth: 300, m:2 }}
          />
          <Button
            sx={{ backgroundColor: "mediumseagreen", m:2}}
            id="submit-game-night-button"
            onClick={(event) => handleSubmit(event)}
            variant="contained"
          >
          Create Game Night
        </Button>
        <Popover
          id={validationId}
          open={validationOpen}
          anchorEl={validationAnchor}
          onClose={handleValidatorClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          >
            <List sx={{ p: 2 }}>
            {!startTimeValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please select a valid start time.</ListItemText>
              </ListItem> ) : (<></>)}
              {!endTimeValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please select a valid end time.</ListItemText>
              </ListItem> ) : (<></>)}
              {!dateValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please select a valid date.</ListItemText>
              </ListItem> ) : (<></>)}
              {!locationValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please enter a location.</ListItemText>
              </ListItem> ) : (<></>)}
              {!guestsValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please add at least one contact to the guest list.</ListItemText>
              </ListItem> ) : (<></>)}
              {!gamesValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please select at least one game.</ListItemText>
              </ListItem> ) : (<></>)}
            </List>
          </Popover>
        </form>
      </div>
      <div className="contact-and-games-new-event-container">
      
        <ButtonGroup
          className="contact-button-group"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            id="contact-menu-button"
            aria-controls={openContactMenu ? 'contact-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openContactMenu ? 'true' : undefined}
            onClick={handleContactClick}
          >
            Invite Contacts
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
        > {props.contactList.length ===0 ? (<MenuItem>Create new contacts to see them in this list!</MenuItem>) : ("")}
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
          ))}
        </Menu>

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
          sx={{ p: 2 }}
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
            sx={{ minWidth: 200, m:1 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 30}}
          />
            <TextField
            id="new-contact-last"
            label="Last name"
            type="text"
            value={newContactLast}
            onChange={(event) => handleChange('newContactLast', event)}
            sx={{ minWidth: 200, m:1 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 30}}
          />
            <TextField
            id="new-contact-email"
            label="Email"
            type="text"
            value={newContactEmail}
            onChange={(event) => handleChange('newContactEmail', event)}
            sx={{ minWidth: 300, m:1 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 320}}
          />
            <Button variant="contained" sx={{ m:1 }}onClick={(event) => handleNewContactSubmit(event) } className="submit-button">Invite New Contact</Button>
            <Popover
          id={contactValidationId}
          open={contactValidationOpen}
          anchorEl={contactValidationAnchor}
          onClose={handleContactValidatorClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          >
            <List sx={{ p: 2 }}>
            {!contactFirstValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please enter a first name.</ListItemText>
              </ListItem> ) : (<></>)}
              {!contactLastValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please enter a last name.</ListItemText>
              </ListItem> ) : (<></>)}
              {!contactEmailValid ? (
              <ListItem>
                <ListItemIcon><ErrorIcon /></ListItemIcon>
                <ListItemText>Please enter a valid email address.</ListItemText>
              </ListItem> ) : (<></>)}
            </List>
          </Popover>
          </form>
        </Popover>
      </div>
        <Button
          id="game-menu-button"
          aria-controls={openGameMenu ? 'game-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openGameMenu ? 'true' : undefined}
          onClick={handleGameClick}
          variant="contained"
          sx={{ marginLeft: 2}}
        >
          Select Games
        </Button>
        <Menu
          id="game-menu"
          anchorEl={gameAnchor}
          open={openGameMenu}
          onClose={handleGameClose}
          MenuListProps={{ 'aria-labelledby': 'game-menu-button' }}
        > {props.collection.length ===0 ? (<MenuItem onClick={() => {navigate(`/search/`)}}>Use Search to add games to your collection!</MenuItem>) : ("")}
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
            sx={{ minWidth: 250, maxWidth: 250 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16, textAlign: "center" }}>Guest List</ListSubheader>
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
        {/* <Divider orientation="vertical" flexItem /> */}
        <div className="game-picker-container">
          <List
            sx={{ minWidth: 500, maxWidth: 500 }}
            subheader={
              <ListSubheader sx={{ fontSize: 16, textAlign: "center" }}>Game List</ListSubheader>
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
