import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import SearchResult from '../components/SearchResult';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from 'react-icons/fa';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import logo from '../assets/searchperson.svg';

interface collectionProps {
  user: string;
  token: string;
}

export default function CollectionPage(props: collectionProps) {
  const [collection, setCollection] = useState<any>([]);
  const [alphaCollection, setAlphaCollection] = useState<any>([]);
  const [alpha, setAlpha] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://maestrodeljuego.herokuapp.com/library/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setCollection(result.data);
        console.log(collection);
        setAlphaCollection(
          [...result.data].sort(function (a: any, b: any) {
            let fa = a.title.toLowerCase(),
              fb = b.title.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
        );
        console.log(alphaCollection);
      })
      .catch((error) => console.log(error));
  }, []);

  return props.token === '' ? (
    <h1>Please login to see your collection page</h1>
  ) : alpha ? (
    <Grid container xs={12} direction="row">
      <Grid item xs={3}>
        <Grid container direction="column">
          <Button
            type="submit"
            variant="contained"
            onClick={() => setAlpha(true)}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            Alphabetical
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => setAlpha(false)}
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
          >
            Card View
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <h1 className="collection-header-alpha">{props.user}'s Collection</h1>
        <div className="collection-container-alpha">
          {alphaCollection.map((game: any) => (
            <SearchResult gameId={game.bgg} gameName={game.title} />
          ))}
        </div>
      </Grid>
      <Grid item xs={4}>
        <img src={logo} alt="Library Image"></img>
      </Grid>
    </Grid>
  ) : (
    <Grid container xs={12} direction="row">
      <Grid item xs={2}>
        <Grid container direction="column">
          <Button
            type="submit"
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
            onClick={() => {
              setAlpha(true);
            }}
            variant="outlined"
          >
            Alphabetical
          </Button>
          <Button
            type="submit"
            onClick={() => setAlpha(false)}
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
            variant="contained"
          >
            Card View
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <h1 className="collection-header">{props.user}'s Collection</h1>
        <div className="collection-container">
          {collection.map((game: any) => (
            <GameCard
              gameId={game.bgg}
              gameName={game.title}
              pubYear={game.pub_year}
              imageUrl={game.image}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
