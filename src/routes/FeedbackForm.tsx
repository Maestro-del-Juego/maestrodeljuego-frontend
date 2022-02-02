import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FeedbackCard from '../components/FeedbackCard';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface feedbackProps {}

export default function FeedbackForm(props: feedbackProps) {
  const [guestPick, setGuestPick] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [guest, setGuest] = useState('');
  const [votes, setVotes] = useState<any[]>([]);
  const [feedbackProvider, setFeedbackProvider] = useState(0);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [host, setHost] = useState('');
  const [playedGames, setPlayedGames] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');
  const [overallScore, setOverallScore] = useState<number | null>(2.5);
  const [overallHover, setOverallHover] = useState(-1);
  const [voted, setVoted] = useState(false);

  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        console.log(result.data);
        setHost(result.data.user.username);
        setGuestList(result.data.attendees);
        setPlayedGames(result.data.games);
        setGuest(
          result.data.attendees[0].first_name +
            ' ' +
            result.data.attendees[0].last_name
        );
        setFeedbackProvider(result.data.attendees[0].pk);
        for (let i = 0; i < result.data.games.length; i++) {
          setVotes((oldData) => [
            ...oldData,
            {
              game: result.data.games[i].pk,
              rating: null,
            },
          ]);
        }
      })
      .catch((error: any) => console.log(error));
  }, []);

  useEffect(() => {
    for (let individual of guestList) {
      if (individual.first_name + ' ' + individual.last_name === guest) {
        setFeedbackProvider(individual.pk);
      }
    }
  }, [guest]);

  const feedbackHandler = (event: any) => {
    event.preventDefault();

    let voteCopy = [...votes];
    let gameSubmission = voteCopy.filter((vote) => vote.rating !== null);
    console.log(gameSubmission);
    for (let game of gameSubmission) {
      game.attendee = feedbackProvider;
    }
    console.log(gameSubmission);

    let overallSubmission = {
      attendee: feedbackProvider,
      overall_rating: overallScore,
      comments: feedback,
    };
    console.log(overallSubmission);

    axios
      .post(
        `https://maestrodeljuego.herokuapp.com/gamenight/${gameId}/feedback/`,
        overallSubmission,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    axios
      .post(
        `https://maestrodeljuego.herokuapp.com/gamenight/${gameId}/gamefeedback/`,
        gameSubmission,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        setVoted(true);
      })
      .catch((error) => console.log(error));
  };

  const guestHandler = (event: any) => {
    event.preventDefault();
    for (let individual of guestList) {
      if (individual.first_name + ' ' + individual.last_name === guest) {
        if (individual.email === guestEmail) {
          setGuestPick(false);
        } else {
          setEmailError('Email does not match our records for this guest.');
        }
      }
    }
  };

  const voteHandler = (gamePk: number, voteScore: number) => {
    let newVotes = [...votes];
    for (let gameId of newVotes) {
      if (gameId.game === gamePk) {
        gameId.rating = voteScore;
      }
      setVotes(newVotes);
    }
  };

  return guestPick ? (
    <div id="guest-list-select">
      <form onSubmit={guestHandler} id="guest-list-form">
        <h1>Thank you for attending {host}'s Game Knight!</h1>
        <h3>{host} would like to know what you thought of the evening.</h3>
        <h4>Select your name below:</h4>
        <div id="guest-select">
          <Select
            title="Guest List Dropdown"
            name="guests"
            id="guest-list-dropdown"
            value={guest}
            sx={{ backgroundColor: 'white' }}
            onChange={(event) => {
              setGuest(event.target.value);
            }}
          >
            {guestList.map((name: any, i: any) => {
              return (
                <MenuItem
                  value={name.first_name + ' ' + name.last_name}
                  key={i}
                >
                  {name.first_name + ' ' + name.last_name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div id="email-confirm">
          <p>{emailError}</p>
          <label htmlFor="guest-email">
            <h3>Please confirm your email:</h3>
          </label>
          <TextField
            id="guest-email"
            type="text"
            value={guestEmail}
            onChange={(event) => setGuestEmail(event.target.value)}
            sx={{ backgroundColor: 'white' }}
          ></TextField>
        </div>
        <Button sx={{ color:"#334195" }}type="submit" id="guest-list-button">
          Submit
        </Button>
      </form>
    </div>
  ) : voted ? (
    <h2 style={{ textAlign: 'center' }}>Thank you for your feedback!</h2>
  ) : (
    <form onSubmit={feedbackHandler} id="feedback">
      <div id="feedback-form">
        <div id="game-feedback">
          <h2>How would you rate the games you played?</h2>
          <div id="feedback-game-cards">
            {playedGames.map((game: any, i: any) => {
              return (
                <FeedbackCard
                  title={game.title}
                  url={game.image}
                  key={game.pk}
                  voteHandler={voteHandler}
                  pk={game.pk}
                />
              );
            })}
          </div>
          <h2>How was the night overall?</h2>
          <Rating
            name="hover-feedback"
            value={overallScore}
            precision={1}
            onChange={(event, newValue) => {
              setOverallScore(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setOverallHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <h2>Any feeback you would like to give your host?</h2>
          <TextField
            id="outlined-multiline-flexible"
            label="Your thoughts?"
            multiline
            style={{ width: 400, backgroundColor: 'white' }}
            maxRows={6}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            fullWidth
          />
        </div>
        <Button
          id="feedback-submit"
          variant="contained"
          type="submit"
          style={{ backgroundColor: '#334195' }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
