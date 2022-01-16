import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

const Login = ({setAuth, updateAvatar}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("click happens")
    axios.post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
      "username": username,
      "password": password
    })
      .then((data) => {
        console.log(data)
        if (data && data.data.auth_token) {
          console.log(data.data.auth_token)
          setAuth(username, data.data.auth_token)
          setLoggedIn(true)
          }
        })
      .catch((error) => {setErrors("Username or password is incorrect.")})
    
  }

  return (
    loggedIn ? <Navigate to="/" /> :
      (<form onSubmit={handleSubmit}>
        {/* conditionally show error message */}
        {errors && <div className="bg-red white pa3">{errors}</div>}
        <div className="mb-3 container">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="form-control"
          />
        </div>
  
        <div className="mb-3 container">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="mv2 container">
          <button type="submit" className="btn btn-primary">Log In</button>
        </div>
      </form>
      )
  )
}

export default Login;