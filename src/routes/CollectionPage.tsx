import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchResult from '../components/SearchResult';

interface collectionProps {
  user: string;
  token: string;
}

export default function CollectionPage(props: collectionProps) {
  const [collection, setCollection] = useState<any>([]);

  let collectionArray: any[];
  collectionArray = [];

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

  console.log(collectionArray);

  return (
    <>
      <h1>{props.user}'s Collection</h1>
      <div id="collection-container">
        {collection.map((game: any) => (
          <SearchResult gameId={game.bgg} gameName={game.title} />
        ))}
      </div>
    </>
  );
}
