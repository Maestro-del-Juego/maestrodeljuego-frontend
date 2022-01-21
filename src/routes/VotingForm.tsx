import { useEffect, useState } from 'react';
import VoteCard from '../components/VoteCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface gameNightProps {
  token: string;
}

export default function VotingForm(props: gameNightProps) {
  const [guestPick, setGuestPick] = useState(true);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [gameList, setGameList] = useState([]);
  const [guest, setGuest] = useState('');
  const [voter, setVoter] = useState(0);
  const [votes, setVotes] = useState<any[]>([]);

  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        console.log(result.data);
        setGuestList(result.data.invitees);
        console.log(result.data.options);
        setGameList(result.data.options);
        setGuest(
          result.data.invitees[0].first_name +
            ' ' +
            result.data.invitees[0].last_name
        );
        for (let i = 0; i < result.data.options.length; i++) {
          setVotes((oldData) => [
            ...oldData,
            {
              pk: result.data.options[i].pk,
              vote: 0,
            },
          ]);
        }
      })
      .catch((error: any) => console.log(error));
  }, []);

  const guestListHandler = () => {
    setGuestPick(!guestPick);
    for (let individual of guestList) {
      if (individual.first_name + ' ' + individual.last_name === guest) {
        setVoter(individual.pk);
      }
    }
  };

  const voteHandler = (gamePk: number, voteScore: number) => {
    let newVotes = [...votes];
    for (let gameId of newVotes) {
      if (gameId.pk === gamePk) {
        gameId.vote = voteScore;
      }
      setVotes(newVotes);
    }
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
            value={guest}
            onChange={(event) => setGuest(event.target.value)}
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
          return (
            <VoteCard
              title={game.title}
              url={game.image}
              key={game.pk}
              voteHandler={voteHandler}
              pk={game.pk}
            />
          );
        })}
      </div>
      <button type="submit" onClick={guestListHandler} id="vote-submit">
        Vote
      </button>
    </div>
  );
}
