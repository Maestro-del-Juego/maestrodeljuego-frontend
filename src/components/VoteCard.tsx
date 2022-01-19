export default function VoteCard() {
  return (
    <div id="vote-card-container">
      <h3>Game Title</h3>
      <img
        src="https://m.media-amazon.com/images/I/9172ZauQ7CL._AC_SY550_.jpg"
        alt="Game Cover Art"
        className="vote-card-image"
      />
      <div id="vote-buttons">
        <button className="smiley-vote" title="smiley-vote">
          <i className="far fa-smile"></i>
        </button>
        <button className="neutral-vote" title="neutral-vote">
          <i className="far fa-meh"></i>
        </button>
        <button className="frowny-vote" title="frowny-vote">
          <i className="far fa-frown"></i>
        </button>
        «
      </div>
    </div>
  );
}
