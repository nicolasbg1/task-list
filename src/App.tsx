import { useEffect, useReducer, useRef, useState, type Key } from 'react'
import { CreateTask } from './components/CreateTask'
import { Form } from './components/Form'
import { NotTask } from './components/NotTask'

export function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, dispatch] = useReducer(reducer, loadTasksFromLocalStorage())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    saveTasksToLocalStorage(tasks)
  }, [tasks])

  type Task = {
    id: number
    value: string
    isCompleted: boolean
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function reducer(state: Task[], action: { type: any; payload: any }) {
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
        return state.filter((task) => task.id !== action.payload)
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
  }

  const deleteTask = (taskId: Key | undefined | number) => {
    dispatch({
      type: 'delete-task',
      payload: taskId,
    })
  }

  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  }

  function saveTasksToLocalStorage(tasks: unknown[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  return (
    <section className="container">
      <Form
        handleSubmitForm={handleSubmitForm}
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
      />
      {!tasks.length ||
      tasks.every((task: { isCompleted: boolean }) => task.isCompleted) ? (
        <NotTask />
      ) : null}

      {tasks.length > 0 && (
        <ol className="taskContainer">
          {tasks.map((task: { id: Key | undefined }) => (
            <CreateTask key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </ol>
      )}
    </section>
  )
}
