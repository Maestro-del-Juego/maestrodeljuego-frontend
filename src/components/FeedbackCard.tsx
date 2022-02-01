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
  const [score, setScore] = useState<number | null>(2.5);
  const [hover, setHover] = useState(-1);

  let hoverValue: any[];
  hoverValue = [hover !== -1 ? hover : score];

  return (
    <div id="vote-card">
      <h3 style={{ fontFamily: 'Roboto Condensed' }}>{props.title}</h3>
      <img src={props.url} alt="Game Cover Art" className="vote-card-image" />
      <Rating
        name="hover-feedback"
        value={score}
        precision={1}
        onChange={(event, newValue) => {
          props.voteHandler(props.pk, newValue);
          setScore(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  );
}
