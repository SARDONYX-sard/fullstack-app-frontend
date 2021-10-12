import React from "react";
import type { NoteService } from "../types/note";

const Note = ({ note, toggleImportance }: { note: NoteService; toggleImportance: () => void }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
