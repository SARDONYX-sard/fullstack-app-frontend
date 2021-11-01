import React, { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleImportanceOf } from '../reducers/noteReducer'
import type { NoteAction, NoteFilter, NoteService } from '../types/note'

type Props = {
  note: {
    important: boolean
    content: string
  }
  handleClick: () => void
}

const Note = ({ note, handleClick }: Props) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

type NoteSelector = {
  notes: NoteService[]
  filter: NoteFilter
}

const Notes = () => {
  const dispatch = useDispatch<Dispatch<NoteAction>>()
  const notes = useSelector<NoteSelector, NoteService[]>(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT' ? notes.filter(note => note.important) : notes.filter(note => !note.important)
  })

  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} handleClick={() => dispatch(toggleImportanceOf(note.id))} />
      ))}
    </ul>
  )
}

export default Notes
