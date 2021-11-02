export type NoteService = {
  id: number
  content: string
  date: string
  important: boolean
  user: string
}

export type NoteAction = {
  type: 'NEW_NOTE' | 'INIT_NOTES' | 'TOGGLE_IMPORTANCE' | 'SET_FILTER'
  data: Partial<NoteService> | Partial<NoteService>[]
  filter?: NoteFilter
}

export type NoteFilter = 'ALL' | 'IMPORTANT' | 'NONIMPORTANT'

export type PostNote = Omit<NoteService, 'id' | 'date' | 'user'>

export type User = {
  name: string
  token: string
  username: string
}
