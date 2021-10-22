import axios from 'axios'
import type { NoteService, PostNote } from '../types/note'
const baseUrl = '/api/notes'

let token: string

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get<NoteService[]>(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject: PostNote) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post<NoteService>(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id: number, newObject: PostNote) => {
  const request = axios.put<NoteService>(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export { getAll, create, update, setToken }
