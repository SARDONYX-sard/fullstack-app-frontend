import React, { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleImportanceOf } from '../../../reducers/noteReducer'
import { NoteAction, NoteFilter, NoteService } from '../../../types/note'
import { Note } from '.'

type NoteSelector = {
  notes: NoteService[]
  filter: NoteFilter
}

export const Notes = () => {
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
