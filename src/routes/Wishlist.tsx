import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';

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
      <h1>{props.user}'s Wishlist</h1>
      <div id="collection-container">
        {wishlist.map((game: any) => (
          <GameCard
            gameId={game.bgg}
            gameName={game.title}
            pubYear={game.pub_year}
            imageUrl={game.image}
          />
        ))}
      </div>
    </>
  );
}
