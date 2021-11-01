import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'
import type { NoteAction } from '../types/note'

const VisibilityFilter = () => {
  const dispatch = useDispatch<Dispatch<Omit<NoteAction, 'data'>>>()

  return (
    <div>
      all
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} />
      important
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} />
      nonimportant
      <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
    </div>
  )
}

export default VisibilityFilter
