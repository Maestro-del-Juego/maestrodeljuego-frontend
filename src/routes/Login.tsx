import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

interface loginProps {
  setAuth: any;
  updateAvatar: any;
}

const Login = (props: loginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('click happens');
    axios
      .post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
        username: username,
        password: password,
      })
      .then((data) => {
        console.log(data);
        if (data && data.data.auth_token) {
          props.setAuth(username, data.data.auth_token);
          setToken(data.data.auth_token);
          setLoggedIn(true);
          console.log(data.data.auth_token);
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
      .catch((error) => {
        console.log(error);
        setErrors('Username or password is incorrect.');
      });
  };

  return loggedIn ? (
    <Navigate to={`/play_stats/${username}`} />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errors && <div className="bg-red white pa3">{errors}</div>}
          <div className="mb-3 container">
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
            />
          </div>

          <div className="mb-3 container">
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div id="login-links">
            <Button type="submit" className="btn btn-primary">
              Log In
            </Button>
            <Link to={'/registration'} style={{ textDecoration: 'none' }}>
              <Button className="btn btn-primary">
                Don't Have an Account?
              </Button>
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
