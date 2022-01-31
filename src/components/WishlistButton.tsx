import axios from "axios";
import { useState } from "react";
import { Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
            <>
            {props.wishlisted === true ? (
              <Button
              className="wishlist-button-on-list"
              onClick={(event) => handleSubmit(event)}
              variant="contained"
              startIcon={<NotificationsIcon />}
              >On wishlist</Button>
            ):(
              <Button
              className="wishlist-button-not-on-list"
              onClick={(event) => handleSubmit(event)}
              variant="outlined">Add to wishlist</Button>
            ) }
            </>
          ) : (<>
              <Button
              disabled
              className="wishlist-button-disabled"
              variant="outlined"
              >Add to wishlist</Button>
          </>) }
        </>
  );
}
