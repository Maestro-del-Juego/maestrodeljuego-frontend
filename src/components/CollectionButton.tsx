import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
            <>
            {props.owned === true ? (
              <Button
              className="collection-button-owned"
              onClick={(event) => handleSubmit(event)}
              variant="contained"
              sx={{ backgroundColor:"#334195" }}
              startIcon={<CheckCircleIcon />}
              >In collection</Button>
            ):(
              <Button
              className="collection-button-not-owned"
              onClick={(event) => handleSubmit(event)}
              sx={{ backgroundColor:"white", color:"#334195", borderColor:"#334195" }}
              variant="outlined">Add to collection</Button>
            ) }
            </>
          ) : (<>
          <Button
              disabled
              className="collection-button-disabled"
              variant="outlined"
              >Add to collection</Button></>) }
        </>
      );
}