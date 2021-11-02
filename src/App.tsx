import React, { useState } from 'react'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { Note, Notes } from './components/model/note'
import { Home, Login, Users } from './components/pages'
import { Footer } from './components/ui'
import type { NoteService } from './types/note'

const App = () => {
  const [notes] = useState<NoteService[]>([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
      date: '2017-01-01'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
      date: '2017-01-01'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
      date: '2017-01-01'
    }
  ])

  const [user, setUser] = useState<string>('')

  const login = (user: string) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useRouteMatch<{ id: string }>('/notes/:id')
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        {user ? (
          <>
            <Link style={padding} to="/users">
              users
            </Link>
            <em>{user} logged in</em>
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">{user ? <Users /> : <Redirect to="/login" />}</Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
