import { Link } from 'react-router-dom';
import image from '../assets/logo.png';

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
        <Link to={props.auth === '' ? '/' : `/play_stats/${props.user}`}>
          <img
            src={image}
            id="logo"
            title="Game Master"
            alt="Game Master Logo"
          />
        </Link>
        <div id="site-nav">
          <Link to={`/collection/${props.user}`}>Your Collection</Link> |
          <Link to={`/wishlist/${props.user}`}>Wishlist</Link> |
          <Link to="/">Browse Games</Link> |
          <Link to="/search">Search Games</Link> |
          <Link to="/gamenight">Game Night!</Link>
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
      <hr id="hr-one" />
      <hr id="hr-two" />
    </>
  );
}
