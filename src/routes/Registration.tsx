import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface regProps {
  setAuth: any;
  updateAvatar: any;
}

const Registration = (props: regProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    console.log(avatar);
    console.log(retypePassword);
    if (password === retypePassword) {
      axios
        .post('https://maestrodeljuego.herokuapp.com/auth/users/', {
          username: username,
          password: password,
          avatar: avatar,
          re_password: retypePassword,
        })
        .then((response) => {
          console.log(response);
          axios
            .post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
              username: username,
              password: password,
            })
            .then((data) => {
              console.log(data);
              if (data && data.data.auth_token) {
                props.setAuth(username, data.data.auth_token);
                setLoggedIn(true);
                axios
                  .get('https://maestrodeljuego.herokuapp.com/auth/users/me', {
                    headers: {
                      Authorization: `Token ${data.data.auth_token}`,
                    },
                  })
                  .then((results) => props.updateAvatar(results.data.avatar))
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => alert(error.message));
        })
        .catch((error) =>
          setErrors(
            "Username or password is invalid. Passwords must be at least 8 characters long and contain no strung together patterns (i.e. '1234' or 'abcde')."
          )
        );
    } else {
      setErrors('Passwords do not match.');
    }
  };

  return loggedIn ? (
    <Navigate to={`/play_stats/${username}`} />
  ) : (
    <Container component="main" maxWidth="xs">
      <h2>Register an Account</h2>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div className="username-register">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoFocus
              sx={{ backgroundColor:"white" }}
            />
          </div>
          <p id="registration-errors">{errors}</p>
          <div className="mv2">
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="password"
              autoFocus
              sx={{ backgroundColor:"white" }}
            />
          </div>
          <div className="mv2">
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="repassword"
              label="Retype Password"
              name="repassword"
              value={retypePassword}
              onChange={(event) => setRetypePassword(event.target.value)}
              autoComplete="repassword"
              autoFocus
              sx={{ backgroundColor:"white" }}
            />
          </div>
          <div id="avatar-field">
            <label htmlFor="avatar">
              Include an HTML image link for your account avatar.
            </label>
            <TextField
              margin="normal"
              fullWidth
              id="avatar"
              label="User Avatar"
              name="avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
              autoComplete="repassword"
              autoFocus
              sx={{ backgroundColor:"white" }}
            />
          </div>
          <div className="mv2">
            <Button type="submit" sx={{ color:"#334195" }}>Submit</Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
