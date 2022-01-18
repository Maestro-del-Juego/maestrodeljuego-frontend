import axios from 'axios';
import { useState } from 'react';

interface collectionButtonProps {
    token: string;
    gameId: any;
    owned: boolean;
    setOwned: any;
    setWishlisted: any;
}

export default function CollectionButton(props: collectionButtonProps) {
    const handleSubmit = (event: any) => {
        const ownedApi = `https://maestrodeljuego.herokuapp.com/games/${props.gameId}/`
        event.preventDefault()
        axios.patch(ownedApi, {
            "owned": []
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${props.token}`
            }
        }
        ).then(response => {
            if (response) {
                console.log(response)
                props.setOwned(response.data.owned)
                props.setWishlisted(false)
            }})
    }
    return (
        <>
          {props.token !== "" ? (
            <button
              className="collection-button"
              onClick={(event) => handleSubmit(event)}
            >
              {props.owned === true ? (<>Remove from collection</>) : (<>Add to collection</>)}
            </button>
          ) : (
            <></>
          )}
        </>
      );
}