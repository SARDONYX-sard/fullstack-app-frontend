import axios from 'axios'

import type { User } from '../types/note'

const baseUrl = '/api/login'

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data as User
}

export { login }
