import { useEffect, useReducer, useRef, useState, type Key } from 'react'

import { reducer } from './services/formService'
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from './services/taskService'

// import { Footer } from './components/Footer'
import { Form } from './components/Form'
import { CreateTask } from './components/task/CreateTask'
import { NoTask } from './components/task/NoTask'

export function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, dispatch] = useReducer(reducer, loadTasksFromLocalStorage())
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    saveTasksToLocalStorage(tasks)
  }, [tasks])

  const deleteTask = (taskId: Key | undefined) => {
    dispatch({
      type: 'delete-task',
      payload: taskId,
    })
  }

  return (
    <main className="main-container">
      <section className="container">
        <Form
          handleSubmitForm={handleSubmitForm}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputRef={inputRef}
        />
        {tasks.length === 0 ? <NoTask /> : null}

        {tasks.length > 0 && (
          <ol className="taskContainer">
            {tasks.map((task: { id: Key }) => (
              <CreateTask key={task.id} task={task} deleteTask={deleteTask} />
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}
