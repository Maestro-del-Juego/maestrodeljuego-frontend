import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router'

interface regProps {
  setAuth: any,
  updateAvatar: any
}

const Registration = (props: regProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (password === retypePassword) {
      axios.post('https://maestrodeljuego.herokuapp.com/auth/users/', {
        "username": username,
        "password": password,
        "re_password": retypePassword
      })
        
      axios.post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
            "username": username,
            "password": password
          })
          .then((data) => {
            console.log(data)
            if (data && data.data.auth_token) {
              props.setAuth(username, data.data.auth_token)
              setLoggedIn(true)
              props.updateAvatar("")
              axios.get('https://questions-t10.herokuapp.com/auth/users', {
                headers: {
                  "Authorization": `Token ${data.data.auth_token}`
                }
              })
                .then(response => {
                  axios.get(`https://questions-t10.herokuapp.com/user/${response.data[0].pk}/`)
                    .then(response => {
                      console.log(response)
                    })
                })
            }
          })
        .catch((error) => alert(error.message))
        } else {
      setErrors("Passwords do not match.")
    }
  }


  return ( loggedIn ? <Navigate to="/aboutyou" /> :
    (<form onSubmit={handleSubmit}>
      <div className="username-register">
        <label htmlFor="usernameInput">Create Username</label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={(event) => setUsername(event.target.value)}>
        </input>
      </div>
      <p>{errors}</p>
      <div className="mv2">
        <label className="db mb2" htmlFor="passwordInput">
          Create Password
        </label>
        <input
          type="password"
          id="passwordInput"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="mv2">
        <label className="db mb2" htmlFor="retypePasswordInput">
          Re-type Password
        </label>
        <input
          type="password"
          id="retypePasswordInput"
          value={retypePassword}
          onChange={(event) => setRetypePassword(event.target.value)}
        />
      </div>
      <div className="mv2">
        <button type="submit">Submit</button>
      </div>
    </form>)
  )
}

export default Registration