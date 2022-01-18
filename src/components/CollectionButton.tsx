import axios from 'axios';
import { useState } from 'react';

interface collectionButtonProps {
    token: string
    gameId: number
    owned: boolean;
    setOwned: any;
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
                props.setOwned(response.data.owned)
            }})
    }
    return (<button className="collection-button" onClick={(event) => handleSubmit(event)}>Collection Button Text</button>)
}