import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

interface feedbackCardProps {
  url: string;
  title: string;
  pk: number;
  voteHandler: any;
}

export default function FeedbackCard(props: feedbackCardProps) {
  const [score, setScore] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

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

  let hoverValue: any[];
  hoverValue = [hover !== -1 ? hover : score];

  return (
    <div id="vote-card">
      <h5>{props.title}</h5>
      <img src={props.url} alt="Game Cover Art" className="vote-card-image" />
      <Rating
        name="hover-feedback"
        value={score}
        precision={0.5}
        onChange={(event, newValue) => {
          props.voteHandler(props.pk, newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {score !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : score]}</Box>
      )}
    </div>
  );
}
