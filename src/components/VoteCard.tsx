import { useState } from 'react';
import Button from '@mui/material/Button';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface voteCardProps {
  url: string;
  title: string;
  pk: number;
  voteHandler: any;
}

export default function VoteCard(props: voteCardProps) {
  const [smileySelected, setSmileySelected] = useState(false);
  const [neutralSelected, setNeutralSelected] = useState(false);
  const [frownySelected, setFrownySelected] = useState(false);

  return (
    <div id="vote-card">
      <h4 className="vote-card-title" >{props.title}</h4>
      <img src={props.url} alt="Game Cover Art" className="vote-card-image" />
      <div id="vote-buttons">
        {frownySelected || neutralSelected ? (
          <Button          
            className="smiley-vote"
            title="Sounds Great!"
            variant="outlined"
            sx={{ color:"mediumseagreen", borderColor:"mediumseagreen", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 1);
              setSmileySelected(true);
              setFrownySelected(false);
              setNeutralSelected(false);
            }}
          >
            <SentimentVerySatisfiedIcon />
          </Button>
        ) : smileySelected ? (
          <Button
            className="smiley-vote"
            title="Sounds Great!"
            variant="contained"
            sx={{ backgroundColor:"mediumseagreen", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setSmileySelected(false);
            }}
          >
            <SentimentVerySatisfiedIcon />
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="Sounds Great!"
            variant="outlined"
            sx={{ color:"mediumseagreen", borderColor:"mediumseagreen", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 1);
              setSmileySelected(true);
            }}
          >
            <SentimentVerySatisfiedIcon />
          </Button>
        )}
        {smileySelected || frownySelected ? (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="outlined"
            sx={{ color:"goldenrod", borderColor:"goldenrod", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(true);
              setSmileySelected(false);
              setFrownySelected(false);
            }}
          >
            <SentimentNeutralIcon />
          </Button>
        ) : neutralSelected ? (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="contained"
            sx={{ backgroundColor:"goldenrod", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(false);
            }}
          >
            <SentimentNeutralIcon />
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="outlined"
            sx={{ color:"goldenrod", borderColor:"goldenrod", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(true);
            }}
          >
            <SentimentNeutralIcon />
          </Button>
        )}
        {smileySelected || neutralSelected ? (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="outlined"
            sx={{ color:"crimson", borderColor:"crimson", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, -1);
              setFrownySelected(true);
              setSmileySelected(false);
              setNeutralSelected(false);
            }}
          >
            <SentimentVeryDissatisfiedIcon />
          </Button>
        ) : frownySelected ? (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="contained"
            sx={{ backgroundColor:"crimson", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setFrownySelected(false);
            }}
          >
            <SentimentVeryDissatisfiedIcon />
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="outlined"
            sx={{ color:"crimson", borderColor:"crimson", height:40 }}
            onClick={() => {
              props.voteHandler(props.pk, -1);
              setFrownySelected(true);
            }}
          >
            <SentimentVeryDissatisfiedIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
