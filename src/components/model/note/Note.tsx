import React from 'react'

import { NoteService } from '../../../types/note'

type Props = {
  note: NoteService | null | undefined
  handleClick?: () => void
}

export const Note = ({ note, handleClick }: Props) => {
  if (!note) return <strong>Note ID not Found</strong>

  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}
