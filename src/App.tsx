import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import useLocalStorageState from 'use-local-storage-state';

function App() {

  const [user, setUser] = useLocalState

  return (
    <Router>
      <NavBar />
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;
