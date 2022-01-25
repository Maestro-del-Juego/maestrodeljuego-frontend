import { useState } from 'react';

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
        {smileySelected ? (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="success"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setSmileySelected(false);
            }}
          >
            <i className="far fa-smile"></i>
          </button>
        ) : (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="outline-success"
            onClick={() => {
              props.voteHandler(props.pk, 1);
              setSmileySelected(true);
            }}
          >
            <i className="far fa-smile"></i>
          </button>
        )}
        {neutralSelected ? (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="warning"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(false);
            }}
          >
            <i className="far fa-meh"></i>
          </button>
        ) : (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="outline-warning"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setNeutralSelected(true);
            }}
          >
            <i className="far fa-meh"></i>
          </button>
        )}
        {frownySelected ? (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="danger"
            onClick={() => {
              props.voteHandler(props.pk, 0);
              setFrownySelected(false);
            }}
          >
            <i className="far fa-frown"></i>
          </button>
        ) : (
          <button
            className="smiley-vote"
            title="smiley-vote"
            // variant="outline-danger"
            onClick={() => {
              props.voteHandler(props.pk, -1);
              setFrownySelected(true);
            }}
          >
            <i className="far fa-frown"></i>
          </button>
        )}
      </div>
    </div>
  );
}
