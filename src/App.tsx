import { useRef, useState } from 'react'
import { Form } from './components/Form'

export function App() {
  const [tasks, setTask] = useState('')
  const inputRef = useRef<HTMLInputElement>(null) // luta grande

  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setTask('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
    console.log(tasks)
  }

  return (
    <main>
      <Form
        handleSubmitForm={handleSubmitForm}
        tasks={tasks}
        setTask={setTask}
        inputRef={inputRef}
      />
    </main>
  )
}
