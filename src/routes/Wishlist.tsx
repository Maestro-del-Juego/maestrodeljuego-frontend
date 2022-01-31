import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import React from 'react'

interface wishlistProps {
  user: string;
  token: string;
}

export default function CollectionPage(props: wishlistProps) {
  const [wishlist, setWishlist] = useState<any>([]);

  useEffect(() => {
    axios
      .get('https://maestrodeljuego.herokuapp.com/wishlist/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setWishlist(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="wishlist-header">{props.user}'s Wishlist</h1>
      <div id="collection-container">
        {wishlist.map((game: any) => (
          <React.Fragment key={`wishlist-item-${game.title}`}>
          <GameCard
            gameId={game.bgg}
            gameName={game.title}
            pubYear={game.pub_year}
            imageUrl={game.image}
            minPlayers={game.min_players}
            maxPlayers={game.max_players}
            playtime={game.playtime}
          />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
