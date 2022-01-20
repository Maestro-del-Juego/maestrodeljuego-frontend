import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';

interface collectionProps {
  user: string;
  token: string;
}

export default function CollectionPage(props: collectionProps) {
  const [collection, setCollection] = useState<any>([]);

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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 id="collection-header">{props.user}'s Collection</h1>
      <div id="collection-container">
        {collection.map((game: any) => (
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
