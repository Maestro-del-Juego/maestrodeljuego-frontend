import axios from 'axios';
import { useState } from 'react';
import { collectionObject } from '../routes/CreateEvent';
import { contactObject } from '../routes/CreateEvent';
import EventGameIcon from '../components/EventGameIcon';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

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

interface paramsObject {

}

export default function EventForm(props: eventFormProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('')
  const [updater, setUpdater] = useState(0);
  const [eventParams, setEventParams] = useState<paramsObject[]>([]);

  const handleSubmit = (event: any) => {
    const eventApi = 'https://maestrodeljuego.herokuapp.com/gamenight/';
    const gameSelectionArray: any = []
    props.selectedGames.forEach(game => gameSelectionArray.push(game.pk))
    const inviteesArray: any = []
    props.guestList.forEach(guest => inviteesArray.push(guest.pk))
    while (gameSelectionArray.length < 10) {gameSelectionArray.push(null)}
    console.log(date)
    console.log(inviteesArray)
    console.log(startTime)
    console.log(location)
    console.log(gameSelectionArray[0])
    console.log(gameSelectionArray[1])
    console.log(gameSelectionArray[2])
    console.log(gameSelectionArray[3])
    console.log(gameSelectionArray[4])
    event.preventDefault();
    axios.post(eventApi, {
        "date": date,
        "invitees": inviteesArray,
        "start_time": startTime,
        "location": location,
        "option1": gameSelectionArray[0],
        "option2": gameSelectionArray[1],
        "option3": gameSelectionArray[2],
        "option4": gameSelectionArray[3],
        "option5": gameSelectionArray[4],
        "option6": gameSelectionArray[5],
        "option7": gameSelectionArray[6],
        "option8": gameSelectionArray[7],
        "option9": gameSelectionArray[8],
        "option10": gameSelectionArray[9]
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        }
    }
    ).then(response => {
        console.log(response)
    })
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


  return (
    <>
      <div className="event-form-container">
        <form className="create-event-form" onSubmit={handleSubmit}>
          <label className="form-label">Date: </label>
          <input
            type="date"
            value={date}
            onChange={(event) => handleChange('date', event)}
          />
          <label className="form-label">Start Time: </label>
          <input
            type="time"
            value={startTime}
            onChange={(event) => handleChange('startTime', event)}
          />
          <label className="form-label">End Time: </label>
          <input
            type="time"
            value={endTime}
            onChange={(event) => handleChange('endTime', event)}
          />
          <label className="form-label">Location: </label>
          <input
            type="text"
            value={location}
            onChange={(event) => handleChange('location', event)}
           />
          <button className="submit-button">Create Event</button>
        </form>
      </div>

        <div>
            <DropdownButton id="contact-dropdown" title="Add Contacts">
            {props.contactList.map((contact) => (
                    <>
                    <Dropdown.Item onClick={() => {props.handleAddGuestClick(contact); setUpdater(updater + 1);}}>{contact.first_name} {contact.last_name}</Dropdown.Item>
                    </>
                ))}
            </DropdownButton>
        </div>
        <div>
            <DropdownButton id="game-dropdown" title="Select Games">
                {props.collection.map((game) => (
                    <>
                    <Dropdown.Item onClick={() => {props.handleAddClick(game); setUpdater(updater + 1);}}>{game.title}</Dropdown.Item>
                    </>
                ))}
            </DropdownButton>
        </div>
        {/* <div className="new-contact-form-container">
            <form className="new-contact-form" onSubmit={handleSubmitContact}>
                <label className="form-label">First Name: </label>
                <input
                    type="text"
                    value={first_name}
                    onChange={(event) => handleChange('date', event)}
          />
                <label className="form-label">Last Name: </label>
                <label className="form-label">Email: </label>

            </form>
        </div> */}

      {/* <div className="collection-container">
        <h2>Your Collection</h2>
        {props.collection.map((game) => (
          <div
            className="game-icon-container"
            key={`${game.pk}-collection-icon`}
          >
            <EventGameIcon
              key={game.pk}
              imageUrl={game.image}
              gameTitle={game.title}
            />
            <button
              className="event-form-game-button"
              onClick={() => {
                props.handleAddClick(game);
                setUpdater(updater + 1);
              }}
            >
              Add to Event
            </button>
          </div>
        ))}
      </div> */}
      <div className="selected-games-container">
          <h3>Selected Games:</h3>
        {props.selectedGames.map((game) => (
          <div className="game-selection-container" key={`${game.pk}-selected-icon`}>
            <img className="game-selection-image" src={game.image} alt={game.title} />
            <h6>{game.title}</h6>
            <button
              className="event-form-game-button"
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
            <div className="guest-container" key={`${guest.first_name}${guest.last_name}`}>
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
