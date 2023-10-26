import { useReducer, useRef, useState, type Key } from 'react'
import { CreateTask } from './components/CreateTask'
import { Form } from './components/Form'
import { NotTask } from './components/NotTask'

export function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, dispatch] = useReducer(reducer, [])
  const inputRef = useRef<HTMLInputElement>(null) // luta grande

  function reducer(state: any[], action: { type: any; payload: any }) {
    switch (action.type) {
      case 'add-task': {
        return [
          ...state,
          {
            id: Date.now(),
            value: action.payload,
            isCompleted: false,
          },
        ]
      }

      case 'delete-task': {
        return state.filter((task: { id: Key }) => task.id !== action.payload)
      }

      default: {
        return state
      }
    }
  }

  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (inputValue) {
      dispatch({
        type: 'add-task',
        payload: inputValue,
      })

      setInputValue('')
      inputRef.current?.focus()
    }

    console.log(inputValue)
  }

  const deleteTask = (taskId: Key | undefined | number) => {
    dispatch({
      type: 'delete-task',
      payload: taskId,
    })
  }

  return (
    <section className="container">
      <Form
        handleSubmitForm={handleSubmitForm}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
      />
      {!tasks ||
        (tasks.every((task: { isCompleted: boolean }) => task.isCompleted) && (
          <NotTask />
        ))}

      {tasks && (
        <ol className="taskContainer">
          {tasks.map((task: { id: Key | undefined }) => (
            <CreateTask key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </ol>
      )}
    </section>
  )
}
