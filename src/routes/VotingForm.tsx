import { useEffect, useState } from 'react';
import VoteCard from '../components/VoteCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const dummyGuests = [
  'Frodo',
  'Merry',
  'Sam',
  'Pippin',
  'Aragorn',
  'Boromir',
  'Legolas',
  'Gimli',
  'Gandalf',
];

interface gameNightProps {
  token: string;
}

export default function VotingForm(props: gameNightProps) {
  const [guestPick, setGuestPick] = useState(true);
  const [gameNight, setGameNight] = useState<any>({});

  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    console.log(props.token);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => console.log(error));
  });

  const guestListHandler = () => {
    setGuestPick(!guestPick);
  };

  let gameArray = [];

  for (let i = 0; i < 5; i++) {
    gameArray.push(<VoteCard />);
  }

  return guestPick ? (
    <div id="guest-list-select">
      <form onSubmit={guestListHandler} id="guest-list-form">
        <h3>Guest List</h3>
        <div id="guest-select">
          <select
            title="Guest List Dropdown"
            name="guests"
            id="guest-list-dropdown"
          >
            {dummyGuests.map((name, i) => {
              return (
                <option value={name} key={i}>
                  {name}
                </option>
              );
            })}
          </select>
          <button type="submit" id="guest-list-button">
            Select
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div id="guest-vote-form">
      <h1 id="vote-header">Welcome to Game Night!</h1>
      <div id="game-suggestions">{gameArray}</div>
      <button type="submit" onClick={guestListHandler} id="vote-submit">
        Back
      </button>
    </div>
  );
}
