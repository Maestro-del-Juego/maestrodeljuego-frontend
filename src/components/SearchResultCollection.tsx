import { Link } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from 'react'
import {  ListItem, ListItemText, ListItemIcon, Popover, IconButton, Tooltip } from '@mui/material';
import GameInfoPopoverCollection from './GameInfoPopoverCollection'
import InfoIcon from '@mui/icons-material/Info';

interface resultsProps {
    gameId: number;
    gameName: string;
    token: string;
    user: string;
}

export default function SearchResultCollection(props: resultsProps) {
    const [detailAnchor, setDetailAnchor] = useState(null)
    const handleDetailClick = (event: any) => {
        setDetailAnchor(event.currentTarget);
    }
    const handleDetailClose = () => {
        setDetailAnchor(null);
    }
    const detailOpen = Boolean(detailAnchor);
    const detailId = detailOpen ? "detail-popover" : undefined;

    return (
        <>
        <ListItem className="search-result-card" secondaryAction={
            <Tooltip title="View game details">
            <IconButton edge="end" aria-label="info-pane" onClick={(event) => handleDetailClick(event)}>
                <InfoIcon />
            </IconButton>
            </Tooltip>
        }>
            <ListItemIcon><ArrowRightIcon /></ListItemIcon>
            <ListItemText className="search-result" key={`result-${props.gameId}`}>
            <Link className="search-result-link" to={`/games/${props.gameId}`} key={props.gameId}>
                {props.gameName}
            </Link>
            
            </ListItemText>
            <Popover
                id={detailId}
                open={detailOpen}
                anchorEl={detailAnchor}
                onClose={handleDetailClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
          >
            <GameInfoPopoverCollection token={props.token} user={props.user} gameId={props.gameId} />
          </Popover>
        </ListItem>
        </>
    )
}