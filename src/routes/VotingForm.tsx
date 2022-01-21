import { useEffect, useState } from 'react';
import VoteCard from '../components/VoteCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface gameNightProps {
  token: string;
}

export default function VotingForm(props: gameNightProps) {
  const [guestPick, setGuestPick] = useState(true);
  const [gameNight, setGameNight] = useState<any>({});
  const [guestList, setGuestList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [voteData, setVoteData] = useState<any>({});

  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    console.log(props.token);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        setGameNight(result.data);
        console.log(result.data);
        setGuestList(result.data.invitees);
        setGameList(result.data.options);
      })
      .catch((error: any) => console.log(error));
  }, []);

  // let guestList = [...gameNight.invitees];

  const guestListHandler = () => {
    setGuestPick(!guestPick);
  };

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
            {guestList.map((name: any, i: any) => {
              return (
                <option value={name.first_name + ' ' + name.last_name} key={i}>
                  {name.first_name + ' ' + name.last_name}
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
      <h1 className="vote-header">Welcome to Game Night!</h1>
      <br></br>
      <h2 className="vote-header">Below are your selections:</h2>
      <div id="vote-card-container">
        {gameList.map((game: any, i: any) => {
          return <VoteCard title={game.title} url={game.image} />;
        })}
      </div>
      <button type="submit" onClick={guestListHandler} id="vote-submit">
        Vote
      </button>
    </div>
  );
}
