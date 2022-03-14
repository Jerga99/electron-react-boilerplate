import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (evt) => setUsername(evt.target.value)

  const handlePassword = (evt) => setPassword(evt.target.value)

  const handleSubmit = (evt) => {
    evt.preventDefault()
  }

  return (
    <div>
      {electron.jp.read()}
      <div className="login-form">
        <form id="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input name="username" onChange={handleUsername} value={username} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input name="password" onChange={handlePassword} value={password} />
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
