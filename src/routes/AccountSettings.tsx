import axios from 'axios';
import { useState } from 'react';

interface settingsProps {
  user: string;
  avatar: string;
  authToken: string;
  updateAvatar: any;
}
export default function AccountSettings(props: settingsProps) {
  const [avExpanded, setAvExpanded] = useState(false);
  const [newAv, setNewAv] = useState(props.avatar);
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
        props.updateAvatar(response.data.avatar);
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
              props.avatar
                ? props.avatar
                : 'https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'
            }
            alt="User Avatar"
            id="settings-avatar"
          ></img>
          <h3>{props.user}</h3>
          <button
            onClick={() => {
              setAvExpanded(!avExpanded);
            }}
          >
            Change Avatar
          </button>
          {avExpanded && (
            <form onSubmit={handleAvSubmit}>
              <label htmlFor="change-av">Submit a new HTML image link: </label>
              <input
                type="text"
                value={newAv}
                id="change-av"
                onChange={(event) => setNewAv(event.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
        <div id="change-username">
          <h2>Change Username</h2>
          <form onSubmit={handleUserSubmit}>
            <label htmlFor="current-pass-username">Password</label>
            <input
              type="password"
              id="current-pass-username"
              value={currentPassUser}
              onChange={(event) => setCurrentPassUser(event.target.value)}
            ></input>
            {badCurrentPassUser === '' ? null : <p>{badCurrentPassUser}</p>}
            <label htmlFor="new-user-name">New Username</label>
            <input
              type="text"
              id="new-user-name"
              value={newUserName}
              onChange={(event) => setNewUserName(event.target.value)}
            ></input>
            {badNewUser === '' ? null : <p>{badNewUser}</p>}
            <label htmlFor="re-new-user-name">Re-enter New Username</label>
            <input
              type="text"
              id="re-new-user-name"
              value={reNewUsername}
              onChange={(event) => setReNewUsername(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div id="change-password">
        <h2>Change Password</h2>
        <form onSubmit={handlePassSubmit}>
          <label htmlFor="current-pass">Current Password</label>
          <input
            type="password"
            id="current-pass"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          ></input>
          {badCurrentPass === '' ? null : <p>{badCurrentPass}</p>}
          <label htmlFor="new-pass">New Password</label>
          <input
            type="password"
            id="new-pass"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          ></input>
          {badNewPass === '' ? null : <p>{badNewPass}</p>}
          <label htmlFor="re-new-pass">Re-enter New Password</label>
          <input
            type="password"
            id="re-new-pass"
            value={reNewPassword}
            onChange={(event) => setReNewPassword(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
