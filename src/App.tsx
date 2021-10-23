import React, { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import * as loginService from './services/login'
import * as noteService from './services/notes'
import type { NoteService, PostNote, User } from './types/note'
import { useSafeState } from './utils/hooks'

const App = () => {
  const [notes, setNotes] = useState<NoteService[]>([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useSafeState<User | null>(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [setNotes])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) as User
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [setUser])

  const toggleImportanceOf = (id: number) => {
    const note = notes.find(n => n.id === id)

    if (note) {
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
        })
        .catch(_error => {
          setErrorMessage(`Note '${note.content}' was already removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes?.filter(note => note.important)

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const noteFormRef = useRef<{ toggleVisibility: () => void }>()

  const addNote = (noteObject: PostNote) => {
    noteFormRef.current?.toggleVisibility()
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes?.concat(returnedNote))
    })
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <button onClick={logout}>logout</button>
          <p>{user?.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <h2>Notes</h2>

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>

      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
