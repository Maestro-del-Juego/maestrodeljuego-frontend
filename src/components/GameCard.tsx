import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface gameProps {
  gameId: number;
  gameName: string;
  pubYear: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  playtime: number;
}

export default function GameCard(props: gameProps) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        marginTop: '0px',
        marginBottom: '10px',
        backgroundColor: '#334195',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={props.imageUrl}
        alt={`${props.gameName} Cover Art`}
        sx={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundColor: 'rgba(248, 247, 216, 0.7)',
        }}
      />
      {/* <img
          className="game-box-image"
          alt={props.gameName}
          src={props.imageUrl}
        ></img> */}

      <CardContent>
        <h5>{props.gameName}</h5>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link
          className="search-result-link"
          to={`/games/${props.gameId}`}
          key={props.gameId}
        >
          <Button>Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

{
  /* <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */
}
