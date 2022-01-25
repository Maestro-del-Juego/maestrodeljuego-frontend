import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FeedbackCard from '../components/FeedbackCard';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';

interface feedbackProps {}

export default function FeedbackForm(props: feedbackProps) {
  const [host, setHost] = useState('');
  const [playedGames, setPlayedGames] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');
  const [overallScore, setOverallScore] = useState<number | null>(2);
  const [overallHover, setOverallHover] = useState(-1);

  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        console.log(result.data);
        setHost(result.data.user.username);
        setPlayedGames(result.data.games);
      })
      .catch((error: any) => console.log(error));
  }, []);

  const voteHandler = () => {
    console.log('Vote Submitted!');
  };

  const labels: { [index: string]: string } = {
    0.5: 'Never Again',
    1: 'Awful',
    1.5: 'Not Great',
    2: 'Meh',
    2.5: 'Ok',
    3: 'Not Bad',
    3.5: 'Pretty Fun',
    4: 'Great',
    4.5: 'Excellent',
    5: 'I NEED MORE OF THIS',
  };

  return (
    <form>
      <div id="feedback-form">
        <h1>Thank you for attending {host}'s Game Night!</h1>
        <h2>Let {host} know what you thought about the evening.</h2>
        <div id="game-feedback">
          <h3>How would you rate the games you played?</h3>
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
          <h3>How was the night overall?</h3>
          <Rating
            name="hover-feedback"
            value={overallScore}
            precision={0.5}
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
          {overallScore !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[overallHover !== -1 ? overallHover : overallScore]}
            </Box>
          )}
          <h3>Any feeback you would like to give your host?</h3>
          <TextField
            id="outlined-multiline-flexible"
            label="Your thoughts?"
            multiline
            style={{ width: 400 }}
            maxRows={6}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            fullWidth
          />
        </div>
        <Button id="feedback-submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
}
