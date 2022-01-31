import { Link } from 'react-router-dom';
import logo from '../assets/game-knight-navbar.png';
import { Divider, Box } from '@mui/material'

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
        <Box id="site-nav" sx={{display: "flex" }}>
          <Link to={`/collection/${props.user}`}>Your Collection</Link>
          <Divider sx={{ background: "#334195", marginLeft:1, marginRight:1 }} orientation="vertical" flexItem />
          <Link to={`/wishlist/${props.user}`}>Wishlist</Link>
          <Divider sx={{ background: "#334195", marginLeft:1, marginRight:1 }} orientation="vertical" flexItem />
          <Link to="/search">Add Games</Link>
          <Divider sx={{ background: "#334195", marginLeft:1, marginRight:1 }} orientation="vertical" flexItem />
          <Link to={`/game_night/${props.user}`}>Game Night Dashboard</Link>
        </Box>
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
                  alt="User Avatar"
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
