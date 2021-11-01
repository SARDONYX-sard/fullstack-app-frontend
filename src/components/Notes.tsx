import React from 'react'
import { connect } from 'react-redux'

import { toggleImportanceOf } from '../reducers/noteReducer'
import type { NoteFilter, NoteService } from '../types/note'
import Note from './Note'

type Props = {
  notes: NoteService[]
  filter: NoteFilter
}

const Notes = ({ notes }: Props) => {
  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} handleClick={() => toggleImportanceOf(note.id)} />
      ))}
    </ul>
  )
}

const mapStateToProps = (state: Props) => {
  if (state.filter === 'ALL') {
    return { ...state, notes: state.notes } as const
  }

  return {
    ...state,
    notes:
      state.filter === 'IMPORTANT' ? state.notes.filter(note => note.important) : state.notes.filter(note => !note.important)
  } as const
}

const mapDispatchToProps = {
  toggleImportanceOf
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
