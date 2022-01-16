import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/logo.png';

interface navProps {
  user: string,
  logout: any
}

export default function NavBar(props: navProps) {
  return (
    <>
      <div id="nav-bar">
        <img src={image} id="logo" title="Game Master" />
        <div id="site-nav">
          <Link to="/">Your Collection</Link> |
          <Link to="/about">Wishlist</Link> |
          <Link to="/">Browse Games</Link> |
          <Link to="/about">Game Night!</Link>
        </div>
        <div id="account-links">
          { (props.user === '') ?
            (<>
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
            </>)
            :
            <button type="submit" onClick={props.logout}>Log Out</button>
          }
        </div>
      </div>
      <hr id="hr-one" />
      <hr id="hr-two" />
    </>
  )
}