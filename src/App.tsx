import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { Note, Notes } from './components/model/note'
import { Home, Login, Users } from './components/pages'
import { Footer } from './components/ui'
import { initializeNotes } from './reducers/noteReducer'
import store from './store'
import { NoteService } from './types/note'

const App = () => {
  const notes = store.getState().notes as NoteService[]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

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
