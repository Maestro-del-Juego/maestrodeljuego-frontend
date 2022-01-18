import axios from 'axios';
import { useState } from 'react';

interface settingsProps {
  user: string;
  avatar: string;
  authToken: string;
}
export default function AccountSettings(props: settingsProps) {
  const [avExpanded, setAvExpanded] = useState(false);
  const [newAv, setNewAv] = useState(props.avatar);
  const [currentUserName, setCurrentUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [badCurrentUser, setBadCurrentUser] = useState('');
  const [badNewUser, setBadNewUser] = useState('');
  const [badCurrentPass, setBadCurrentPass] = useState('');
  const [badNewPass, setBadNewPass] = useState('');
  const [badReNewPass, setBadReNewPass] = useState('');

  const handleAvSubmit = (event: any) => {
    axios
      .post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
        username: props.user,
        password: props.avatar,
      })
      .then((data) => {
        console.log(data);
        // if (data && data.data.auth_token) {
        //   props.setAuth(username, data.data.auth_token)
        //   setLoggedIn(true)
        //   props.updateAvatar("")
        //   axios.get('https://questions-t10.herokuapp.com/auth/users', {
        //     headers: {
        //       "Authorization": `Token ${data.data.auth_token}`
        // }
      })
      //     .then(response => {
      //       axios.get(`https://questions-t10.herokuapp.com/user/${response.data[0].pk}/`)
      //         .then(response => {
      //           console.log(response)
      //         })
      //     })
      // }
      // })
      .catch((error) => alert(error.message));
  };

  const handlePassSubmit = (event: any) => {
    axios
      .post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
        username: props.user,
        password: props.avatar,
      })
      .then((data) => {
        console.log(data);
        // if (data && data.data.auth_token) {
        //   props.setAuth(username, data.data.auth_token)
        //   setLoggedIn(true)
        //   props.updateAvatar("")
        //   axios.get('https://questions-t10.herokuapp.com/auth/users', {
        //     headers: {
        //       "Authorization": `Token ${data.data.auth_token}`
        // }
      })
      //     .then(response => {
      //       axios.get(`https://questions-t10.herokuapp.com/user/${response.data[0].pk}/`)
      //         .then(response => {
      //           console.log(response)
      //         })
      //     })
      // }
      // })
      .catch((error) => alert(error.message));
  };

  const handleUserSubmit = (event: any) => {
    axios
      .post('https://maestrodeljuego.herokuapp.com/auth/token/login/', {
        username: props.user,
        password: props.avatar,
      })
      .then((data) => {
        console.log(data);
        // if (data && data.data.auth_token) {
        //   props.setAuth(username, data.data.auth_token)
        //   setLoggedIn(true)
        //   props.updateAvatar("")
        //   axios.get('https://questions-t10.herokuapp.com/auth/users', {
        //     headers: {
        //       "Authorization": `Token ${data.data.auth_token}`
        // }
      })
      //     .then(response => {
      //       axios.get(`https://questions-t10.herokuapp.com/user/${response.data[0].pk}/`)
      //         .then(response => {
      //           console.log(response)
      //         })
      //     })
      // }
      // })
      .catch((error) => alert(error.message));
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
                value={props.avatar}
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
            <label htmlFor="current-user-name">Current Username</label>
            <input
              type="text"
              id="current-user-name"
              value={currentUserName}
              onChange={(event) => setCurrentUserName(event.target.value)}
            ></input>
            {badCurrentUser === '' ? null : <p>{badCurrentUser}</p>}
            <label htmlFor="new-user-name">New Username</label>
            <input
              type="text"
              id="new-user-name"
              value={newUserName}
              onChange={(event) => setNewUserName(event.target.value)}
            ></input>
            {badNewUser === '' ? null : <p>{badNewUser}</p>}
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
          {badReNewPass === '' ? null : <p>{badReNewPass}</p>}
        </form>
      </div>
    </div>
  );
}
