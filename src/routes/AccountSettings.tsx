import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface settingsProps {
  user: string;
  avatar: string;
  authToken: string;
  updateAvatar: any;
  updateUser: any;
}
export default function AccountSettings(props: settingsProps) {
  const [avExpanded, setAvExpanded] = useState(false);
  const [newAv, setNewAv] = useState('');
  const [currentPassUser, setCurrentPassUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [reNewUsername, setReNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [badCurrentPassUser, setBadCurrentPassUser] = useState('');
  const [badNewUser, setBadNewUser] = useState('');
  const [badCurrentPass, setBadCurrentPass] = useState('');
  const [badNewPass, setBadNewPass] = useState('');
  const [currentAv, setCurrentAv] = useState(props.avatar);
  const [currentUsername, setCurrentUsername] = useState(props.user);

  const handleAvSubmit = (event: any) => {
    event.preventDefault();
    console.log(newAv);
    console.log(props.authToken);
    axios
      .patch(
        'https://maestrodeljuego.herokuapp.com/auth/users/me/',
        {
          avatar: `${newAv}`,
        },
        {
          headers: {
            Authorization: `Token ${props.authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.updateAvatar(newAv);
        setCurrentAv(newAv);
        setNewAv('');
      })
      .catch((error) => alert(error.message));
  };

  const handlePassSubmit = (event: any) => {
    event.preventDefault();
    if (newPassword !== reNewPassword) {
      setBadNewPass("New passwords don't match!");
    }
    axios
      .post(
        'https://maestrodeljuego.herokuapp.com/auth/users/set_password/',
        {
          new_password: `${newPassword}`,
          re_new_password: `${reNewPassword}`,
          current_password: `${currentPassword}`,
        },
        {
          headers: {
            Authorization: `Token ${props.authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setNewPassword('');
        setReNewPassword('');
        setCurrentPassword('');
      })
      .catch((error) => console.log(error));
  };

  const handleUserSubmit = (event: any) => {
    event.preventDefault();
    if (newUserName !== reNewUsername) {
      setBadNewUser("New usernames don't match!");
    }
    axios
      .post(
        'https://maestrodeljuego.herokuapp.com/auth/users/set_username/',
        {
          new_username: `${newUserName}`,
          re_new_username: `${reNewUsername}`,
          current_password: `${currentPassUser}`,
        },
        {
          headers: {
            Authorization: `Token ${props.authToken}`,
          },
        }
      )
      .then((response) => {
        {
          console.log(response);
          setCurrentUsername(newUserName);
          props.updateUser(newUserName);
          setNewUserName('');
          setReNewUsername('');
          setCurrentPassUser('');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="settings-container">
      <h1>Account Settings</h1>
      <div id="top-settings">
        <div id="settings-avatar-div">
          <img
            src={
              currentAv
                ? currentAv
                : 'https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'
            }
            alt="User Avatar"
            id="settings-avatar"
          ></img>
          <h3>{currentUsername}</h3>
          <Button
            onClick={() => {
              setAvExpanded(!avExpanded);
            }}
          >
            Change Avatar
          </Button>
          {avExpanded && (
            <form onSubmit={handleAvSubmit}>
              <TextField
                label="Submit a new HTML image link:"
                type="text"
                value={newAv}
                id="change-av"
                style={{ width: 600 }}
                onChange={(event) => setNewAv(event.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>
          )}
        </div>
        <div id="change-username">
          <h2>Change Username</h2>
          <form onSubmit={handleUserSubmit}>
            <div id="change-username-container">
              <TextField
                label="Password"
                type="password"
                id="current-pass-username"
                value={currentPassUser}
                onChange={(event) => setCurrentPassUser(event.target.value)}
                style={{ width: 250, marginTop: '10px' }}
              ></TextField>
              {badCurrentPassUser === '' ? null : <p>{badCurrentPassUser}</p>}
              <TextField
                label="New Username"
                type="text"
                id="new-user-name"
                value={newUserName}
                onChange={(event) => setNewUserName(event.target.value)}
                style={{ width: 250, marginTop: '10px' }}
              ></TextField>
              {badNewUser === '' ? null : <p>{badNewUser}</p>}
              <TextField
                label="Re-enter New Username"
                type="text"
                id="re-new-user-name"
                value={reNewUsername}
                onChange={(event) => setReNewUsername(event.target.value)}
                style={{ width: 250, marginTop: '10px' }}
              ></TextField>
              <Button type="submit" style={{ width: 70, marginTop: '10px' }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div id="change-password">
        <h2>Change Password</h2>
        <form onSubmit={handlePassSubmit}>
          <TextField
            label="Current Password"
            type="password"
            id="current-pass"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          ></TextField>
          {badCurrentPass === '' ? null : <p>{badCurrentPass}</p>}
          <TextField
            label="New Password"
            type="password"
            id="new-pass"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            style={{ marginLeft: '10px' }}
          ></TextField>
          {badNewPass === '' ? null : <p>{badNewPass}</p>}
          <TextField
            label="Re-enter New Password"
            type="password"
            id="re-new-pass"
            value={reNewPassword}
            onChange={(event) => setReNewPassword(event.target.value)}
            style={{ marginLeft: '10px' }}
          ></TextField>
          <Button
            type="submit"
            style={{ marginLeft: '10px', marginTop: '10px' }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
