import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import useLocalStorageState from 'use-local-storage-state';
import Login from './routes/Login';
import Registration from './routes/Registration';
import Home from "./routes/Home";
import Search from "./routes/Search";
import GameInfoPage from "./routes/GameInfoPage"


function App() {

  const [user, setUser] = useLocalStorageState('gameMasterUser', '');
  const [token, setToken] = useLocalStorageState('gameMasterToken', '');
  const [avatar, setAvatar] = useLocalStorageState('gameMasterAvatar', '');

  function setAuth(username: string, token: string) {
    setUser(username)
    setToken(token)
  }

  const updateAvatar = (newImg: string) =>
    setAvatar(newImg)

  const logoutHandler = () => {
    axios.post(
      'https://maestrodeljuego.herokuapp.com/auth/token/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    ).then(res => {
      console.log(res)
      setUser('')
      setToken('')
    })
    .catch(error => alert(error))
  }

  return (
    <Router>
      <NavBar user={user} logout={logoutHandler} avatar={avatar} />
      <Routes>
        <Route
          path='/login'
          element={<Login setAuth={setAuth} updateAvatar={updateAvatar} />} 
        />
        <Route
          path='/registration'
          element={<Registration setAuth={setAuth} updateAvatar={updateAvatar} />} 
        />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path='games/:gameId' element={<GameInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
