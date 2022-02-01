import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import SearchResultCollection from '../components/SearchResultCollection';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from 'react-icons/fa';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import logo from '../assets/searchperson.svg';
import React from 'react';
import LoadingComponent from '../components/LoadingComponent';
import Wishlist from '../components/Wishlist';

interface collectionProps {
  user: string;
  token: string;
}

export default function CollectionPage(props: collectionProps) {
  const [collection, setCollection] = useState<any>([]);
  const [alphaCollection, setAlphaCollection] = useState<any>([]);
  const [alpha, setAlpha] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://maestrodeljuego.herokuapp.com/auth/users/me/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setCollection(result.data.games);
        console.log(collection);
        setAlphaCollection(
          [...result.data.games].sort(function (a: any, b: any) {
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
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return props.token === '' ? (
    <h1 style={{ textAlign: 'center' }}>
      Please login to see your collection page
    </h1>
  ) : alpha ? (
    <Grid container direction="row">
      <Grid item xs={3}>
        <Grid container direction="column">
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setAlpha(true);
              setWishlist(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            List View
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              setAlpha(false);
              setWishlist(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
          >
            Card View
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              setWishlist(true);
              setAlpha(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            Wishlist
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <h1 className="collection-header-alpha">{props.user}'s Collection</h1>
        <div className="collection-container-alpha">
          {alphaCollection.map((game: any) => (
            <SearchResultCollection
              key={`list-view-${game.title}`}
              gameId={game.bgg}
              gameName={game.title}
              token={props.token}
              user={props.user}
            />
          ))}
        </div>
      </Grid>
      <Grid item xs={4}>
        <img src={logo} alt="Library" id="collection-list-view-image"></img>
      </Grid>
    </Grid>
  ) : wishlist ? (
    <Grid container direction="row">
      <Grid item xs={3}>
        <Grid container direction="column">
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              setAlpha(true);
              setWishlist(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            List View
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              setAlpha(false);
              setWishlist(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
          >
            Card View
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setWishlist(true);
              setAlpha(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            Wishlist
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Wishlist user={props.user} token={props.token} />
      </Grid>
    </Grid>
  ) : loading ? (
    <Grid container direction="row">
      <Grid item xs={2}>
        <Grid container direction="column">
          <Button
            type="submit"
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
            disabled
            variant="outlined"
          >
            List View
          </Button>
          <Button
            type="submit"
            disabled
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
            variant="contained"
          >
            Card View
          </Button>
          <Button
            type="submit"
            variant="outlined"
            disabled
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            Wishlist
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <h1 className="collection-header">{props.user}'s Collection</h1>
        <div id="loading-components">
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
          <LoadingComponent loadingWidth={250} loadingPadding="20" />
        </div>
      </Grid>
    </Grid>
  ) : (
    <Grid container direction="row">
      <Grid item xs={2}>
        <Grid container direction="column">
          <Button
            type="submit"
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
            onClick={() => {
              setAlpha(true);
              setWishlist(false);
            }}
            variant="outlined"
          >
            List View
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setAlpha(false);
              setWishlist(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '20px' }}
            variant="contained"
          >
            Card View
          </Button>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              setWishlist(true);
              setAlpha(false);
            }}
            style={{ width: '130px', marginLeft: '50px', marginTop: '70px' }}
          >
            Wishlist
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <h1 className="collection-header">{props.user}'s Collection</h1>
        <Grid container direction="row" spacing={2}>
          {alphaCollection.map((game: any) => (
            <React.Fragment key={`grid-item-${game.title}`}>
              <Grid item xs={3}>
                <GameCard
                  gameId={game.bgg}
                  gameName={game.title}
                  pubYear={game.pub_year}
                  minPlayers={game.min_players}
                  maxPlayers={game.max_players}
                  playtime={game.playtime}
                  imageUrl={game.image}
                  categories={game.categories}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
