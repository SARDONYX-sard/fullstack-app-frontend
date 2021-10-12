import axios from "axios";
import type { NoteService } from "../types/note";

const baseUrl = "http://localhost:3001/notes";

// const getAll2 = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };

const getAll = () => {
  const request = axios.get<NoteService[]>(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
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
