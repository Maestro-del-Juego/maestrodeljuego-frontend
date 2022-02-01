import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import GameInfoPopoverCollection from './GameInfoPopoverCollection';

interface resultsProps {
  gameId: number;
  gameName: string;
  token: string;
  user: string;
}

export default function SearchResultCollection(props: resultsProps) {
  const [detailAnchor, setDetailAnchor] = useState(null);
  const handleDetailClick = (event: any) => {
    setDetailAnchor(event.currentTarget);
  };
  const handleDetailClose = () => {
    setDetailAnchor(null);
  };
  const detailOpen = Boolean(detailAnchor);
  const detailId = detailOpen ? 'detail-popover' : undefined;

  return (
    <>
      <ListItem className="search-result-card">
        <ListItemText className="search-result" key={`result-${props.gameId}`}>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '334195',
              fontSize: 'large',
              display: 'inline',
              marginLeft: 2,
            }}
            className="search-result-text"
            onClick={(event) => handleDetailClick(event)}
            key={props.gameId}
          >
            {props.gameName}
          </Typography>
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
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <GameInfoPopoverCollection
            token={props.token}
            user={props.user}
            gameId={props.gameId}
          />
        </Popover>
      </ListItem>
    </>
  );
}
