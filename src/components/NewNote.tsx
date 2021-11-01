import React from 'react'
import { connect } from 'react-redux'

import { createNote } from '../reducers/noteReducer'
import { NoteService } from '../types/note'

type Props = {
  createNote: (data: NoteService) => {
    readonly type: 'NEW_NOTE'
    readonly data: NoteService
  }
}

const NewNote = ({ createNote }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addNote = (event: any) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(null, { createNote })(NewNote)
