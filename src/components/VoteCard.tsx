interface voteCardProps {
  url: string;
  title: string;
  pk: number;
  voteHandler: any;
}

export default function VoteCard(props: voteCardProps) {
  return (
    <div id="vote-card">
      <h5>{props.title}</h5>
      <img src={props.url} alt="Game Cover Art" className="vote-card-image" />
      <div id="vote-buttons">
        <button
          className="smiley-vote"
          title="smiley-vote"
          onClick={() => props.voteHandler(props.pk, 1)}
        >
          <i className="far fa-smile"></i>
        </button>
        <button
          className="neutral-vote"
          title="neutral-vote"
          onClick={() => props.voteHandler(props.pk, 0)}
        >
          <i className="far fa-meh"></i>
        </button>
        <button
          className="frowny-vote"
          title="frowny-vote"
          onClick={() => props.voteHandler(props.pk, -1)}
        >
          <i className="far fa-frown"></i>
        </button>
      </div>
    </div>
  );
}
