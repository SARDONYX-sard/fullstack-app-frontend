import { Dispatch } from 'redux'

import noteService from '../services/notes'
import type { NoteAction, NoteService } from '../types/note'

type NoteState = Omit<NoteService, 'date'>[]

const noteReducer = (state: NoteState = [], action: NoteAction) => {
  switch (action.type) {
    case 'NEW_NOTE':
      if (Array.isArray(action.data)) {
        throw new Error('NEW_NOTE action type is not supported Array.')
      }
      return [...state, action.data]

    case 'INIT_NOTES':
      return action.data

    case 'TOGGLE_IMPORTANCE': {
      if (Array.isArray(action.data)) {
        throw new Error('TOGGLE_IMPORTANCE action type is not supported Array.')
      }

      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      if (!noteToChange) throw new Error('note ID not found!')

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      } as const

      return state.map(note => (note.id !== id ? note : changedNote))
    }

    default:
      return state
  }
}

export const initializeNotes = () => {
  return async (dispatch: Dispatch<NoteAction>) => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}

export const createNote = (data: NoteService) => {
  return {
    type: 'NEW_NOTE',
    data
  } as const
}

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  } as const
}

export default noteReducer
