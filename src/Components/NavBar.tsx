import { Link } from 'react-router-dom';

export default function NavBar({ }) {
  

  return (
    <>
      <div>
        <img src="@/assets/logo.png" id="logo" title="Game Master" />
        <div id="site-nav">
          <Link to="/">Your Collection</Link> |
          <Link to="/about">Wishlist</Link> |
          <Link to="/">Browse Games</Link> |
          <Link to="/about">Game Night!</Link>
        </div>
        <div id="account-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <hr id="hr-one" />
      <hr id="hr-two" />
    </>
  )
}