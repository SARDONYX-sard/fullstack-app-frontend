export type NoteService = {
  id: number
  content: string
  date: string
  important: boolean
}

export type NoteAction = {
  type: 'NEW_NOTE' | 'TOGGLE_IMPORTANCE' | 'SET_FILTER'
  data: Partial<NoteService>
  filter?: NoteFilter
}

export type NoteFilter = 'ALL' | 'IMPORTANT' | 'NONIMPORTANT'

export type PostNote = Omit<NoteService, 'id' | 'date'>

export type User = {
  name: string
  token: string
  username: string
}
