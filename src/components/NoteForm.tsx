import React, { useState } from 'react'
import { PostNote } from '../types/note'

type Props = {
  createNote: (noteObject: PostNote) => void
}

const NoteForm = ({ createNote }: Props) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setNewNote(event.target.value)
  }

  const addNote = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
