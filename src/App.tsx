import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import useLocalStorageState from 'use-local-storage-state';
import Login from './routes/Login';
import Registration from './routes/Registration';
import AccountSettings from './routes/AccountSettings';
import Home from './routes/Home';
import Search from './routes/Search';
import GameInfoPage from './routes/GameInfoPage';
import PlayStats from './routes/PlayStats';
import CreateEvent from './routes/CreateEvent';
import VotingForm from './routes/VotingForm';
import CollectionPage from './routes/CollectionPage';
import Wishlist from './routes/Wishlist';
import GameNightMenu from './routes/GameNightMenu';
import GameNightOwnerView from './routes/GameNightOwnerView';

function App() {
  const [user, setUser] = useLocalStorageState('gameMasterUser', '');
  const [token, setToken] = useLocalStorageState('gameMasterToken', '');
  const [avatar, setAvatar] = useLocalStorageState('gameMasterAvatar', '');

  function setAuth(username: string, token: string) {
    setUser(username);
    setToken(token);
  }

  const updateAvatar = (newImg: string) => setAvatar(newImg);

  const updateUser = (newUser: string) => setUser(newUser);

  const logoutHandler = () => {
    axios
      .post(
        'https://maestrodeljuego.herokuapp.com/auth/token/logout/',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUser('');
        setToken('');
        localStorage.clear();
      })
      .catch((error) => alert(error));
  };

  return (
    <Router>
      <NavBar user={user} logout={logoutHandler} avatar={avatar} auth={token} />
      <Routes>
        <Route
          path="/login"
          element={<Login setAuth={setAuth} updateAvatar={updateAvatar} />}
        />
        <Route
          path="/registration"
          element={
            <Registration setAuth={setAuth} updateAvatar={updateAvatar} />
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/user_page/:user"
          element={
            <AccountSettings
              user={user}
              avatar={avatar}
              authToken={token}
              updateAvatar={updateAvatar}
              updateUser={updateUser}
            />
          }
        />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/search" element={<Search />} />
        <Route
          path="games/:gameId"
          element={<GameInfoPage token={token} user={user} />}
        />
        <Route
          path="play_stats/:user"
          element={<PlayStats user={user} token={token} />}
        />
        <Route
          path="/createevent"
          element={<CreateEvent user={user} token={token} />}
        />
        <Route
          path="/game_night/:gameId"
          element={<VotingForm token={token} />}
        />
        <Route path="/game_night" element={<GameNightMenu token={token}/>}  />
        <Route path="/game_night/:gameNightId/finalize" element={<GameNightOwnerView token={token}/>} />
        <Route
          path="/collection/:user"
          element={<CollectionPage user={user} token={token} />}
        />
        <Route
          path="/wishlist/:user"
          element={<Wishlist user={user} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
