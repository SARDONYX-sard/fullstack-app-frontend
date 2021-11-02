import React from 'react'
import { useHistory } from 'react-router-dom'

export const Login = (props: { onLogin: (arg0: string) => void }) => {
  const history = useHistory()

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
