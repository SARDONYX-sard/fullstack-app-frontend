import axios from 'axios'

import type { NoteService, PostNote } from '../types/note'

const baseUrl = '/api/notes'

let token: string

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get<NoteService[]>(baseUrl)
  return response.data
}

const createNew = async (content: string) => {
  const object = { content, important: false }
  const response = await axios.post<NoteService>(baseUrl, object)
  return response.data
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

const noteService = { create, createNew, getAll, setToken, update }
export default noteService
