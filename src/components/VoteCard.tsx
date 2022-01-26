import { useState } from 'react';
import Button from '@mui/material/Button';

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
      <h5>{props.title}</h5>
      <img src={props.url} alt="Game Cover Art" className="vote-card-image" />
      <div id="vote-buttons">
        {frownySelected || neutralSelected ? (
          <Button
            className="smiley-vote"
            title="Sounds Great!"
            variant="outlined"
            color="success"
            onClick={() => {
              props.voteHandler(props.pk, 1);
              setSmileySelected(true);
              setFrownySelected(false);
              setNeutralSelected(false);
            }}
          >
            <i className="far fa-smile"></i>
          </Button>
        ) : smileySelected ? (
          <Button
            className="smiley-vote"
            title="Sounds Great!"
            variant="contained"
            color="success"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setSmileySelected(false);
            }}
          >
            <i className="far fa-smile"></i>
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="Sounds Great!"
            variant="outlined"
            color="success"
            onClick={() => {
              props.voteHandler(props.pk, 1);
              setSmileySelected(true);
            }}
          >
            <i className="far fa-smile"></i>
          </Button>
        )}
        {smileySelected || frownySelected ? (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="outlined"
            color="warning"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(true);
              setSmileySelected(false);
              setFrownySelected(false);
            }}
          >
            <i className="far fa-meh"></i>
          </Button>
        ) : neutralSelected ? (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="contained"
            color="warning"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(false);
            }}
          >
            <i className="far fa-meh"></i>
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="Meh..."
            variant="outlined"
            color="warning"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(true);
            }}
          >
            <i className="far fa-meh"></i>
          </Button>
        )}
        {smileySelected || neutralSelected ? (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="outlined"
            color="error"
            onClick={() => {
              props.voteHandler(props.pk, -1);
              setFrownySelected(true);
              setSmileySelected(false);
              setNeutralSelected(false);
            }}
          >
            <i className="far fa-frown"></i>
          </Button>
        ) : frownySelected ? (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="contained"
            color="error"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setFrownySelected(false);
            }}
          >
            <i className="far fa-frown"></i>
          </Button>
        ) : (
          <Button
            className="smiley-vote"
            title="It's a 'no' for me, dawg."
            variant="outlined"
            color="error"
            onClick={() => {
              props.voteHandler(props.pk, -1);
              setFrownySelected(true);
            }}
          >
            <i className="far fa-frown"></i>
          </Button>
        )}
      </div>
    </div>
  );
}
