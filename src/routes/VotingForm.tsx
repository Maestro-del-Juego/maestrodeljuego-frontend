import { useState } from 'react';
import VoteCard from '../components/VoteCard';

const dummyGuests = ['Frodo', 'Merry', 'Sam', 'Pippin', 'Aragorn', 'Boromir', 'Legolas', 'Gimli', 'Gandalf']

export default function VotingForm() {

  const [guestPick, setGuestPick] = useState(true);

  const guestListHandler = () => {
    setGuestPick(false)
  }

  let gameArray = [];

  for (let i = 0; i < 5; i++){
    gameArray.push(<VoteCard />)
  }

  return (
    guestPick ? (
      <div
        id="guest-list-select">
        <form onSubmit={guestListHandler}>
          <label htmlFor="guest-list-dropdown">
          <select title="Guest List Dropdown" name="guests" id="guest-list-dropdown">
              {dummyGuests.map((name, i) => {
                <option value={name} key={i}>{name}</option>
              })}
          </select>
          </label>
          <button type="submit">Select</button>
        </form>
      </div>)
      :
      (<div id="guest-vote-form">
        <h1>Welcome to Game Night!</h1>
        <div id="game-suggestions">
          {gameArray}
        </div>
      </div>
      )
  )
}