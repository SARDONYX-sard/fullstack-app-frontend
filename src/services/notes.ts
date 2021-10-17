import axios from "axios";
import type { NoteService } from "../types/note";

const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get<NoteService[]>(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject: Omit<NoteService, "id">) => {
  const request = axios.post<NoteService>(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id: number, newObject: Omit<NoteService, "id">) => {
  const request = axios.put<NoteService>(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
