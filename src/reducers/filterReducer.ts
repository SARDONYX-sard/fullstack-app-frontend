import { NoteAction, NoteFilter } from '../types/note'

const filterReducer = (state: 'ALL' | 'SET_FILTER' = 'ALL', action: NoteAction) => {
  console.log(action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = (filter: NoteFilter) => {
  return {
    type: 'SET_FILTER',
    filter
  } as const
}

export default filterReducer
