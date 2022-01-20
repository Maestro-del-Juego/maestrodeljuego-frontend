import { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from '../components/EventForm';

interface createEventProps {
  user: string;
  token: string;
}

export interface collectionObject {
  pk: number;
  bgg: number;
  title: string;
  pub_year: number;
  image: string;
}

export interface contactObject {
  pk: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default function CreateEvent(props: createEventProps) {
  const [collection, setCollection] = useState<collectionObject[]>([]);
  const [selectedGames, setSelectedGames] = useState<collectionObject[]>([]);
  const [contactList, setContactList] = useState<contactObject[]>([]);
  const [guestList, setGuestList] = useState<contactObject[]>([]);

  useEffect(() => {
    const collectionUrl = 'https://maestrodeljuego.herokuapp.com/library/';
    const contactUrl = 'https://maestrodeljuego.herokuapp.com/contacts/';
    axios
      .get(collectionUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${props.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCollection(response.data);
      });
    axios
      .get(contactUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${props.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setContactList(response.data);
      });
  }, [props.token]);

  const handleAddClick = (game: collectionObject) => {
    let array = selectedGames;
    if (array.includes(game) === false && array.length < 10) {
      array.push(game);
    }
    else if (array.length >= 10) { alert("Game limit reached!")}
    setSelectedGames(array);
    console.log(selectedGames);
  };

  const handleRemoveClick = (game: collectionObject) => {
    let array = selectedGames;
    array.splice(array.indexOf(game), 1);
    setSelectedGames(array);
    console.log(selectedGames);
  };

  const handleAddGuestClick = (contact: contactObject) => {
    let array = guestList;
    if (array.includes(contact) === false) {
      array.push(contact);
    }
    setGuestList(array);
    console.log(guestList);
  };

  const handleRemoveGuestClick = (guest: contactObject) => {
    let array = guestList;
    array.splice(array.indexOf(guest), 1);
    setGuestList(array);
    console.log(guestList);
  };

  return (
    <div>
      <EventForm
        collection={collection}
        setCollection={setCollection}
        selectedGames={selectedGames}
        setSelectedGames={setSelectedGames}
        contactList={contactList}
        setContactList={setContactList}
        guestList={guestList}
        setGuestList={setGuestList}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
        handleAddGuestClick={handleAddGuestClick}
        handleRemoveGuestClick={handleRemoveGuestClick}
        token={props.token}
      />
    </div>
  );
}

// Event form needs:
// Date, Time, Location
// Collection on left side
// Game choices right side
