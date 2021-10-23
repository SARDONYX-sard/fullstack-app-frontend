import React from 'react'

type Props = {
  note: {
    important: boolean
    content: string
  }
  toggleImportance: () => void
}

const Note = ({ note, toggleImportance }: Props) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
