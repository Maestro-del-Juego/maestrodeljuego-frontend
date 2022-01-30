import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface resultsProps {
    gameId: number;
    gameName: string;
}

export default function SearchResult(props: resultsProps) {
    return (
        <ListItem className="search-result-card">
            <ListItemIcon><ArrowRightIcon /></ListItemIcon>
            <ListItemText>
            <Link className="search-result-link" to={`/games/${props.gameId}`} key={props.gameId}>
                {props.gameName}
            </Link>
            </ListItemText>
        </ListItem>
    )
}