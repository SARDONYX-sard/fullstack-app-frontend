export type NoteService = {
  id: number
  content: string
  date: string
  important: boolean
}

export type PostNote = Omit<NoteService, 'id' | 'date'>

export type User = {
  name: string
  token: string
  username: string
}
