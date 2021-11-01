import React from 'react'

type Props = {
  note: {
    important: boolean
    content: string
  }
  handleClick: () => void
}

const Note = ({ note, handleClick }: Props) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={handleClick}>{label}</button>
    </li>
  )
}

export default Note
