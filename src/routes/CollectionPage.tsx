import axios from 'axios';
import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import SearchResult from '../components/SearchResult';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from 'react-icons/fa';

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
        setAlphaCollection(
          result.data.sort(function (a: any, b: any) {
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

  return alpha ? (
    <div className="collection-display">
      <ProSidebar>
        <Menu iconShape="square">
          <button type="submit" onClick={() => setAlpha(true)}>
            Alphabetical
          </button>
          <button type="submit" onClick={() => setAlpha(false)}>
            Card View
          </button>
        </Menu>
      </ProSidebar>
      <div>
        <h1 className="collection-header-alpha">{props.user}'s Collection</h1>
        <div className="collection-container-alpha">
          {alphaCollection.map((game: any) => (
            <SearchResult gameId={game.bgg} gameName={game.title} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="collection-display">
      <ProSidebar>
        <Menu iconShape="square">
          <button
            type="submit"
            onClick={() => {
              setAlpha(true);
            }}
          >
            Alphabetical
          </button>
          <button type="submit" onClick={() => setAlpha(false)}>
            Card View
          </button>
        </Menu>
      </ProSidebar>
      <div>
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
      </div>
    </div>
  );
}
