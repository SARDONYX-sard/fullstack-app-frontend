import { NoteAction } from '../types/note'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2
  }
]

const noteReducer = (state = initialState, action: NoteAction) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]

    case 'TOGGLE_IMPORTANCE': {
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

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content: string) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  } as const
}

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  } as const
}

export default noteReducer
