import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { IconButton, Popover, Menu, MenuItem, ButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import moment from 'moment';
import ErrorIcon from '@mui/icons-material/Error';
import { contactObject } from '../routes/CreateEvent';

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
  min_players: number;
  max_players: number;
  playtime: number;
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
  const [newInviteeList, setNewInviteeList] = useState<inviteeObject[]>([]);
  const [rsvpList, setRsvpList] = useState<rsvpObject[]>([]);
  const [contactList, setContactList] = useState<contactObject[]>([]);
  const [newContactFirst, setNewContactFirst] = useState('');
  const [newContactLast, setNewContactLast] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);
  const [status, setStatus] = useState('');
  const [startTimeValid, setStartTimeValid] = useState<Boolean>(false);
  const [endTimeValid, setEndTimeValid] = useState<Boolean>(false);
  const [dateValid, setDateValid] = useState<Boolean>(false);
  const [locationValid, setLocationValid] = useState<Boolean>(false);
  const [contactFirstValid, setContactFirstValid] = useState<Boolean>(false);
  const [contactLastValid, setContactLastValid] = useState<Boolean>(false);
  const [contactEmailValid, setContactEmailValid] = useState<Boolean>(false);
  const [backendDate, setBackendDate] = useState('');


  let { gameNightId } = useParams();
  const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/${gameNightId}/`;

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
        setBackendDate(response.data.date);
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setLocation(response.data.location);
        setSelectedGameList(response.data.games);
        setStatus(response.data.status);
        let tempArray = response.data.options.sort((a: any, b: any) =>
          a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0
        );
        setGameList(tempArray);
        let rsvpTempArray = response.data.rsvps.sort((a: any, b: any) =>
          a.attending > b.attending ? -1 : a.attending < b.attending ? 1 : 0
        );
        setRsvpList(rsvpTempArray);
        let inviteeTempArray = response.data.invitees.sort((a: any, b: any) =>
          a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : 0
        );
        setInviteeList(inviteeTempArray);
        console.log(response.data);
      });
  }, [props.token, gameNightUrl]);

  useEffect(() => {
    const contactUrl = `https://maestrodeljuego.herokuapp.com/auth/users/me/`;
    axios.get(contactUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.token}`,
      },
    })
    .then((response) => {
      let tempArray = response.data.contacts.sort((a: any, b: any) => a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : 0)
      setContactList(tempArray);
    })
  }, [props.token])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleEditValidatorClick(event);
    console.log(date)
    console.log(newInviteeList)
    console.log(startTime)
    console.log(endTime)
    console.log(location)
    console.log(selectedGameList)
    if (validateForm() === true) {
      axios
        .patch(
          gameNightUrl,
          {
            date: date,
            invitees: newInviteeList,
            start_time: startTime,
            end_time: endTime,
            location: location,
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
          let inviteeTempArray = response.data.invitees.sort((a: any, b: any) =>
          a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : 0
          );
          setInviteeList(inviteeTempArray);
          setNewInviteeList([])
          setUpdater(updater + 1);
        });
    }
  };

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
        console.log(response);
        const tempArray = newInviteeList;
        tempArray.push(response.data);
        setNewInviteeList(tempArray)
        let tempArray2 = contactList;
        tempArray2.push(response.data)
        tempArray2 = tempArray2.sort((a: any, b: any) => a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : 0)
        setContactList(tempArray2);
        setUpdater(updater + 1);
        setNewContactFirst('');
        setNewContactLast('');
        setNewContactEmail('');
        handleNewContactClose();
      });
  } else {handleContactValidatorClick(event)}};

  const validateForm = useCallback(() => {
    const timeRGEX = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    setStartTimeValid(timeRGEX.test(startTime));
    setEndTimeValid(timeRGEX.test(endTime));
    const dateRGEX = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    setDateValid(
      dateRGEX.test(date) &&
        moment(date).isSameOrAfter(moment().format('yyyy-MM-DD'))
    );
    setLocationValid(location !== '');
    if (
      startTimeValid === true &&
      endTimeValid === true &&
      dateValid === true &&
      locationValid === true
    ) {
      // setIsFormValid(true);
      return true;
    }
  }, [
    date,
    dateValid,
    endTime,
    endTimeValid,
    location,
    locationValid,
    startTime,
    startTimeValid,
  ]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

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

  const finalizeGameNight = (event: any) => {
    event.preventDefault();

    if (validateForm() === true && selectedGameList.length > 0 && rsvpList.length > 0) {
      axios
        .patch(
          gameNightUrl,
          {
            date: date,
            invitees: newInviteeList,
            start_time: startTime,
            end_time: endTime,
            location: location,
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
          setBackendDate(response.data.date);
          setUpdater(updater + 1);
        });
    } else {
      handleFinalizeValidatorClick(event);
    }
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
        setBackendDate(response.data.date);
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

  const handleAddClick = (game: gameObject) => {
    const gameArray: gameObject[] = []
    gameArray.push(game)
    axios
        .patch(
          gameNightUrl,
          {
            games: gameArray,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${props.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response)
          setSelectedGameList(response.data.games)
          console.log(selectedGameList);
        })
  };

  const handleRemoveClick = (game: gameObject) => {
    const gameArray: gameObject[] = []
    gameArray.push(game)
    axios
        .patch(
          gameNightUrl,
          {
            games: gameArray,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${props.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response)
          setSelectedGameList(response.data.games)
          console.log(selectedGameList);
        })
  };

  const handleAddGuestClick = (contact: contactObject) => {
    let array = newInviteeList;
    console.log(inviteeList.includes(contact))
    if (!(JSON.stringify(inviteeList).includes(JSON.stringify(contact))) && !(array.includes(contact))) {
      array.push(contact);
    }
    setNewInviteeList(array);
  };

  // finalize validation MUI
  const [finalizeValidationAnchor, setFinalizeValidationAnchor] =
    useState(null);
  const handleFinalizeValidatorClick = (event: any) => {
    setFinalizeValidationAnchor(event.currentTarget);
  };
  const handleFinalizeValidatorClose = () => {
    setFinalizeValidationAnchor(null);
  };
  const finalizeValidationOpen = Boolean(finalizeValidationAnchor);
  const finalizeValidationId = finalizeValidationOpen
    ? 'finalize-validation-popover'
    : undefined;

  // edit event validation MUI
  const [editValidationAnchor, setEditValidationAnchor] =
    useState(null);
  const handleEditValidatorClick = (event: any) => {
    setEditValidationAnchor(event.currentTarget);
  };
  const handleEditValidatorClose = () => {
    setEditValidationAnchor(null);
  };
  const editValidationOpen = Boolean(editValidationAnchor);
  const editValidationId = editValidationOpen
    ? 'edit-validation-popover'
    : undefined;

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

  return (
    <>
      <div className="gn-owner-view-container">
        {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
          <form className="edit-gn-form">
            <TextField
              id="date-time-picker"
              label="Date"
              type="date"
              value={date}
              onChange={(event) => {
                if (status === 'Voting') handleChange('date', event);
              }}
              sx={{ minWidth: 220, m:2, backgroundColor:"white" }}
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
              sx={{ minWidth: 150, m:2, backgroundColor:"white" }}
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
              sx={{ minWidth: 150, m:2, backgroundColor:"white" }}
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
              sx={{ minWidth: 300, m:2, backgroundColor:"white" }}
            />
            <Button
              sx={{ m:2, backgroundColor:"#334195" }}
              className="submit-button"
              variant="contained"
              onClick={(event) => handleSubmit(event)}
            >
              Submit Changes
            </Button>
            <Popover
                id={editValidationId}
                open={editValidationOpen}
                anchorEl={editValidationAnchor}
                onClose={handleEditValidatorClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <List sx={{ p: 2 }}>
                  {!startTimeValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please select a valid start time.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!endTimeValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please select a valid end time.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!dateValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>Please select a valid date.</ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!locationValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>Please enter a location.</ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {(locationValid && dateValid && startTimeValid && endTimeValid) ? (
                    <ListItem>
                      <ListItemText>Changes saved!</ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                </List>
              </Popover>
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
              sx={{ minWidth: 220, m:2 }}
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
              sx={{ minWidth: 150, m:2 }}
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
              sx={{ minWidth: 150, m:2 }}
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
              sx={{ minWidth: 300, m:2 }}
            />
            <Button
              sx={{ m: 2 }}
              disabled
              className="submit-button"
              variant="contained"
            >
              Submit Changes
            </Button>
          </form>
        )}
        <div className="contact-finalize-cancel-button-container">
        
        <ButtonGroup
          className="contact-button-group"
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ marginRight: 8, marginTop: 2 }}
        >
          <> {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
          <Button
            id="contact-menu-button"
            aria-controls={openContactMenu ? 'contact-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openContactMenu ? 'true' : undefined}
            onClick={handleContactClick}
            sx={{ backgroundColor:"#334195" }}
          >
            Invite Contacts
          </Button> ) : (
          <Button
          id="contact-menu-button"
          disabled
          aria-controls={openContactMenu ? 'contact-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openContactMenu ? 'true' : undefined}
        >
          Invite Contacts
        </Button>  
          )}
          </>
          <> {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
          <Button
            aria-describedby={newContactPopupId}
            variant="contained"
            onClick={handleNewContactClick}
            sx={{ backgroundColor:"#334195" }}
          >
            Create New Contact
          </Button> ) : (
            <Button
            aria-describedby={newContactPopupId}
            variant="contained"
            disabled
          >
            Create New Contact
          </Button>
          )}
          </>
        </ButtonGroup>
        <Menu
          id="game-menu"
          anchorEl={contactAnchor}
          open={openContactMenu}
          onClose={handleContactClose}
          MenuListProps={{ 'aria-labelledby': 'contact-menu-button' }}
        >
          {contactList.map((contact) => (
            <MenuItem
              key={`${contact.pk}-dropdown`}
              onClick={() => {
                handleAddGuestClick(contact);
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
            <Button variant="contained" sx={{ m:1 }}onClick={(event) => handleNewContactSubmit(event)} className="submit-button">Invite New Contact</Button>
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
          {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
            <>
              <Button
                className="finalize-button"
                variant="contained"
                sx={{ backgroundColor: 'mediumseagreen', marginLeft:8, marginRight: 2, marginTop: 2 }}
                onClick={(event) => {
                  finalizeGameNight(event);
                }}
              >
                Finalize Game Night
              </Button>
              <Popover
                id={finalizeValidationId}
                open={finalizeValidationOpen}
                anchorEl={finalizeValidationAnchor}
                onClose={handleFinalizeValidatorClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <List sx={{ p: 2 }}>
                  {!startTimeValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please select a valid start time.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!endTimeValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please select a valid end time.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!dateValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>Please select a valid date.</ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!locationValid ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>Please enter a location.</ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!(rsvpList.length > 0) ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please wait until invitees RSVP before finalizing event.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                  {!(selectedGameList.length > 0) ? (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Please select at least one game to be played.
                      </ListItemText>
                    </ListItem>
                  ) : (
                    <></>
                  )}
                </List>
              </Popover>
            </>
          ) : (
            <>
              {(status === 'Finalized') && !(moment(backendDate).isBefore(moment())) ? (
                <Button
                  className="reopen-button"
                  variant="contained"
                  sx={{ marginLeft:6, marginRight: 2, marginTop: 2, backgroundColor:"#334195" }}
                  onClick={() => {
                    reopenGameNight();
                  }}
                >
                  Reopen Game Night
                </Button>
              ) : (
                <Button
                sx={{ marginLeft:8, marginRight: 2, marginTop: 2 }}
                  className="reopen-button-disabled"
                  variant="contained"
                  disabled
                >
                  Reopen Game Night
                </Button>
              )}
            </>
          )}
          {status !== 'Cancelled' && !(moment(backendDate).isBefore(moment())) ? (
            <Button
              className="cancel-button"
              variant="contained"
              sx={{ backgroundColor: 'crimson', marginLeft:2, marginRight: 2, marginTop: 2 }}
              onClick={() => {
                cancelGameNight();
              }}
            >
              Cancel Game Night
            </Button>
          ) : (
            <Button
              sx={{ marginLeft:2, marginRight: 2, marginTop:2 }}
              className="cancel-button-disabled"
              variant="contained"
              disabled
            >
              Cancel Game Night
            </Button>
          )}
        </div>
        
        <div className="voting-and-rsvp-container">
        <div className="rsvp-container">
            <List
              sx={{ minWidth: 250, maxWidth: 250 }}
              subheader={
                <ListSubheader sx={{ fontSize: 16, textAlign: "center", backgroundColor:"#f8f8f8" }}>RSVPs:</ListSubheader>
              }
            >
              {newInviteeList.map((invitee) => (
                <React.Fragment
                  key={`pending-${invitee.first_name} ${invitee.last_name}`}
                >
                  <Divider />
                  <ListItem sx={{ backgroundColor: 'gold' }}>
                    <ListItemText
                      primary={`${invitee.first_name} ${invitee.last_name}`}
                      secondary="pending invite..."
                    />
                  </ListItem>
                </React.Fragment>
              ))}
              {rsvpList.map((rsvp) => (
                <React.Fragment key={`rsvp-${rsvp.invitee}`}>
                  <Divider />
                  {rsvp.attending === true ? (
                    <ListItem>
                      <ListItemText
                        primary={rsvp.invitee}
                        secondary="attending"
                      />
                    </ListItem>
                  ) : (
                    <ListItem sx={{ backgroundColor: 'gainsboro' }}>
                      <ListItemText
                        primary={rsvp.invitee}
                        secondary="not attending"
                      />
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
              {inviteeList.map((invitee) => (
                <React.Fragment
                  key={`invitee-${invitee.first_name} ${invitee.last_name}`}
                >
                  <Divider />
                  <ListItem sx={{ backgroundColor: 'silver' }}>
                    <ListItemText
                      primary={`${invitee.first_name} ${invitee.last_name}`}
                      secondary="not RSVP'd"
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </div>
          {/* <Divider orientation="vertical" flexItem /> */}
          <div className="voting-results-container">
            <List
              sx={{ minWidth: 500, maxWidth: 500, marginLeft: 4 }}
              subheader={
                <ListSubheader sx={{ fontSize: 16, textAlign: "center", backgroundColor:"#f8f8f8" }}>
                  Select games to be played:
                </ListSubheader>
              }
            >
              {gameList.map((game) => (
                <React.Fragment key={`voting-results-${game.pk}`}>
                  <Divider />
                  {JSON.stringify(selectedGameList).includes(JSON.stringify(game)) === false ? (
                    <ListItem
                      secondaryAction={
                        <>
                          {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
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
                      <Tooltip title={`${game.min_players}-${game.max_players} Players; ${game.playtime} Minutes`}>
                        <Avatar
                          className="game-selection-image"
                          variant="square"
                          src={game.image}
                          alt={game.title}
                        />
                        </Tooltip>
                      </ListItemAvatar>
                      <ListItemText
                        className="game-picker-title"
                        primary={game.title}
                        secondary={`Vote score: ${game.votes}`}
                      />
                    </ListItem>
                  ) : (
                    <ListItem
                      sx={{ backgroundColor: '#e4e7f6' }}
                      secondaryAction={
                        <>
                          {status === 'Voting' && !(moment(backendDate).isBefore(moment())) ? (
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
                      <Tooltip title={`${game.min_players}-${game.max_players} Players; ${game.playtime} Minutes`}>
                        <Avatar
                          className="game-selection-image"
                          variant="square"
                          src={game.image}
                          alt={game.title}
                        />
                        </Tooltip>
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

          
        </div>
      </div>
    </>
  );
}
