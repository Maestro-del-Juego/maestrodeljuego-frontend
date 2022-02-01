import { Link } from 'react-router-dom';
import { useState } from 'react';
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
  pubYear: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  playtime: number;
  categories?: any;
}

export default function GameCard(props: gameProps) {
  const [gameCategories, setGameCategories] = useState<any[]>(props.categories);

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
          fontSize={20}
          textAlign="left"
          fontWeight="bolder"
        >
          {props.gameName.length > 16
            ? props.gameName.slice(0, 17) + '...'
            : props.gameName}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {gameCategories &&
          gameCategories.slice(0, 3).map((category: any) => (
            <Typography
              color="#F8F0E3"
              fontFamily="Open Sans"
              fontSize={12}
              fontWeight="bolder"
            >
              {category}
            </Typography>
          ))}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link
          className="search-result-link"
          to={`/games/${props.gameId}`}
          key={props.gameId}
          style={{ textDecoration: 'none' }}
        >
          <Button sx={{ fontWeight: 'bolder', color: '#759EB8' }}>
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
