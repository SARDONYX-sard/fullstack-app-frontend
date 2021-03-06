import React from 'react'

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  username: string
  password: string
}

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }: Props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
