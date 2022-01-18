import axios from "axios";
import { useState } from "react";

interface wishlistButtonProps {
    token: string;
    gameId: any;
    wishlisted: boolean;
    setWishlisted: any;
    setOwned: any;
}

export default function WishlistButton(props: wishlistButtonProps) {
  const handleSubmit = (event: any) => {
    const wishlistApi = `https://maestrodeljuego.herokuapp.com/games/${props.gameId}/`;
    event.preventDefault();
    axios
      .patch(
        wishlistApi,
        {
          wishlisted: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          props.setWishlisted(response.data.wishlisted);
          props.setOwned(false)
        }
      });
  };
  return (
    <>
      {props.token !== "" ? (
        <button
          className="wishlist-button"
          onClick={(event) => handleSubmit(event)}
        >
          {props.wishlisted === true ? (<>Remove from wishlist</>) : (<>Add to wishlist</>)}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
