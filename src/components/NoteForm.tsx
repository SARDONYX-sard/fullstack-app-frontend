import React, { useState } from 'react'

import { PostNote } from '../types/note'

export type Props = {
  createNote: (noteObject: PostNote) => void
}

const NoteForm = ({ createNote }: Props) => {
  const [newNote, setNewNote] = useState('')

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setNewNote(event.target.value)
  }

  const addNote: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
