import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface eventProps {
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

export default function GameNightOwnerView(props: eventProps) {
  const [gameList, setGameList] = useState<gameObject[]>([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [updater, setUpdater] = useState(0);
  let { eventId } = useParams();
  const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/${eventId}`;
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
          setGameList(response.data.options);
        console.log(response.data);
      });
  }, [props.token, gameNightUrl]);

  const handleSubmit = () => {console.log("submitted")}

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
          <button className="submit-button">Submit Changes</button>
        </form>
      </div>

      <div className="voting-results-container">
        {gameList.map((game) => (
            <div className="vote-results-container" key={`vote-container${game.pk}`}>
                <img className="game-selection-image" src={game.image} alt={game.title} />
                <div>{game.title}</div>
                <div>Vote Score: {game.votes}</div>
            </div>
        ))}
      </div>
    </>
  );
}
