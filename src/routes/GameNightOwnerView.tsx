import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
}

export default function GameNightOwnerView(props: gameNightProps) {
  const [gameList, setGameList] = useState<gameObject[]>([]);
  const [selectedGameList, setSelectedGameList] = useState<gameObject[]>([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);
  const [status, setStatus] = useState('');
  let { gameNightId } = useParams();
  const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/${gameNightId}`;
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
        setStartTime(response.data.start_time);
        setEndTime(response.data.end_time);
        setLocation(response.data.location);
        setSelectedGameList(response.data.games);
        setStatus(response.data.status);
        let tempArray = response.data.options.sort((a: any, b: any) =>
          a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0
        );
        setGameList(tempArray);
        console.log(response.data);
      });
  }, [props.token, gameNightUrl]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .patch(
        gameNightUrl,
        {
          "date": date,
          "start_time": startTime,
          "end_time": endTime,
          "location": location,
          "games": selectedGameList,
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
        console.log(selectedGameList);
      });
  };

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
        alert("Game night cancelled!");
      });
  };

  const finalizeGameNight = () => {
    axios
      .patch(
        gameNightUrl,
        {
          date: date,
          start_time: startTime,
          end_time: endTime,
          location: location,
          games: selectedGameList,
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
        alert("Game night confirmed!")
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
  };

  const handleAddClick = (game: gameObject) => {
    let array = selectedGameList;
    if (array.includes(game) === false) {
      array.push(game);
    }
    setSelectedGameList(array);
    console.log(selectedGameList);
  };

  const handleRemoveClick = (game: gameObject) => {
    let array = selectedGameList;
    array.splice(array.indexOf(game), 1);
    setSelectedGameList(array);
  };

  return (
    <>
      <div className="gn-owner-view-container">
        <form className="edit-gn-form" onSubmit={handleSubmit}>
          <label className="form-label">Date: </label>
          <input
            type="date"
            value={date}
            onChange={(event) => {if (status==="voting") handleChange('date', event)}}
          />
          <label className="form-label">Start Time: </label>
          <input
            type="time"
            value={startTime}
            onChange={(event) => {if (status==="voting") handleChange('startTime', event)}}
          />
          <label className="form-label">End Time: </label>
          <input
            type="time"
            value={endTime}
            onChange={(event) => {if (status==="voting") handleChange('endTime', event)}}
          />
          <label className="form-label">Location: </label>
          <input
            type="text"
            value={location}
            onChange={(event) => {if (status==="voting") handleChange('location', event)}}
          />
          {status === "Voting" ?
          <button className="submit-button">Submit Changes</button>
          : <></>
          }
        </form>
      </div>

      {status === "Voting" ?
      <div className="finalize-cancel-buttons-container">
        <button className="finalize-button"
            onClick={() => {if (window.confirm("Finalize game night details?")) finalizeGameNight()}}>Confirm Game Night</button>
        <button className="cancel-button"
            onClick={() => {if (window.confirm("Cancel game night?")) cancelGameNight()}}>Cancel Game Night</button>
      </div> : <></>
      }

      <div className="all-voting-results-container">
        <h4>Voting Results:</h4>
        {gameList.map((game) => (
          <div
            className="vote-results-container"
            key={`vote-container${game.pk}`}
          >
            <img
              className="game-selection-image"
              src={game.image}
              alt={game.title}
            />
            <div className="game-selection-text-container">
              <h6>{game.title}</h6>
              <p>Vote Score: {game.votes}</p>
              <button
                onClick={() => {
                  handleAddClick(game);
                  setUpdater(updater + 1);
                }}
              >
                Select Game
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="all-selected-games-container">
        <h4>Selected Games:</h4>
        {selectedGameList.map((game) => (
          <div
            className="selected-game-container"
            key={`selected-game-container${game.pk}`}
          >
            <img
              className="game-selection-image"
              src={game.image}
              alt={game.title}
            />
            <div className="game-selection-text-container">
              <h6>{game.title}</h6>
              <p>Vote Score: {game.votes}</p>
              <button
                onClick={() => {
                  handleRemoveClick(game);
                  setUpdater(updater - 1);
                }}
              >
                Remove Game
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
