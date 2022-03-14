import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleUsername = (evt) => setUsername(evt.target.value)

  const handlePassword = (evt) => setPassword(evt.target.value)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const user = { username, password }
    const test = await login.loginCreds.loggedIn(user)
    if (test) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    setPassword('')
    setUsername('')
  }

  return isLoggedIn ? (
    <div>
      <p>logged in</p>
    </div>
  ) : (
    <div>
      <div className="login-form">
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input name="username" onChange={handleUsername} value={username} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input name="password" type="password" onChange={handlePassword} value={password} />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

{
  /* <h1>I am App Component!!!</h1>
      <button onClick={() => {
        electron.notificationApi.sendNotification('My custom notification!');
      }}>Notify</button>

      <button onClick={() => {
        electron.Api.sendData('test');
      }}>Send</button>  */
}
