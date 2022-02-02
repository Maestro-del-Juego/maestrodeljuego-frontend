import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface gameProps {
  gameId: number;
  gameName: string;
  imageUrl: string;
  amountPlayed: number;
  // dateLastPlayed: string;
}

export default function LeastPlayed(props: gameProps) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        marginTop: '0px',
        marginBottom: '10px',
        backgroundColor: '#334195',
        width: '240px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={props.imageUrl}
        alt={`${props.gameName} Cover Art`}
        sx={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundColor: 'rgba(248, 247, 216, 0.7)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-start', paddingBottom: '0px' }}>
        <Typography
          color="#F8F0E3"
          fontFamily="Open Sans"
          fontSize={18}
          textAlign="left"
          fontWeight="bolder"
        >
          {props.gameName}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          justifyContent: 'flex-start',
          paddingBottom: '0px',
        }}
      >
        <Typography
          color="#F8F0E3"
          fontFamily="Open Sans"
          fontSize={12}
          textAlign="left"
          fontWeight="bold"
        >
          Times played: {props.amountPlayed}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link
          className="search-result-link"
          to={`/games/${props.gameId}`}
          key={props.gameId}
        >
          <Button style={{ color: 'white' }}>Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
