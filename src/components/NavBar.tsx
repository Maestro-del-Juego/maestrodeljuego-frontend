import { Link } from 'react-router-dom';
import logo from '../assets/game-knight-navbar.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material';

interface navProps {
  user: string;
  logout: any;
  avatar: string;
  auth: string;
}

export default function NavBar(props: navProps) {
  return (
    <>
      <div id="nav-bar">
        <div id="game-knight">
          <Link
            to={props.auth === '' ? '/' : `/play_stats/${props.user}`}
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          >
            <img
              src={logo}
              id="logo"
              title="Game Master"
              alt="Game Master Logo"
            />
          </Link>
          <span id="game-knight-banner">Game Knight</span>
        </div>
        <div id="site-nav">
          <Link
            to={`/collection/${props.user}`}
          >
            Your Collection
          </Link>{' '}
          |<Link to={`/wishlist/${props.user}`}>Wishlist</Link> |
          <Link to="/">Browse Games</Link> |
          <Link to="/search">Search Games</Link> |
          <Link to="/game_night">Game Night!</Link>
        </div>
        <div id="account-links">
          {props.user === '' ? (
            <>
              <Link to="/login">Login</Link>|
              <Link to="/registration">Register</Link>
            </>
          ) : (
            <div id="navbar-avatar">
              <Link to={`/user_page/${props.user}`}>
                <img
                  src={
                    props.avatar === '' || props.avatar === null
                      ? 'https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'
                      : props.avatar
                  }
                  title="User Avatar"
                  id="avatar"
                />
              </Link>
              <Link to="/" onClick={props.logout} id="log-out">
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr id="hr-1" />
      <hr id="hr-2" />
    </>
  );
}
