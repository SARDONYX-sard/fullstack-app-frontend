import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux'

import { createNote } from '../reducers/noteReducer'
import { NoteAction } from '../types/note'

const NewNote = () => {
  const dispatch = useDispatch<Dispatch<NoteAction>>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addNote = (event: any) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
