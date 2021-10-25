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
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
