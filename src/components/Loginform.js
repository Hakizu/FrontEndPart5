import React from 'react'

const Loginform = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit = {handleSubmit}>
        <div>
            Username
          <input
            type = 'text'
            data-cy = 'username'
            value = {username}
            name = "Username"
            onChange = {handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type = 'text'
            data-cy = 'password'
            value = {password}
            name = "Password"
            onChange = {handlePasswordChange}
          />
        </div>
        <button type='submit' data-cy='loginButton'>login</button>
      </form>
    </div>
  )
}

export default Loginform