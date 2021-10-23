import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = component.getByText('make not important')
  fireEvent.click(button)

  // ? for debug
  // const li = component.container.querySelector('li')
  // if (li) console.log(prettyDOM(li))

  // handler called times
  expect(mockHandler.mock.calls).toHaveLength(1)

  // method 1
  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')

  // method 2
  const element = component.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})
