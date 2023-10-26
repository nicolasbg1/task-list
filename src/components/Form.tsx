import React from 'react'
import { NotTask } from './NotTask'

type FormProps = {
  handleSubmitForm: (e: { preventDefault: () => void }) => void
  tasks: string
  setTask: (newTask: string) => void
  inputRef: React.RefObject<HTMLInputElement> // revisar
}

export function Form({
  handleSubmitForm,
  tasks,
  setTask,
  inputRef,
}: FormProps) {
  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleSubmitForm} className="form">
        <input
          type="text"
          value={tasks}
          placeholder="Digite sua tarefa"
          onChange={(e) => setTask(e.target.value)}
          ref={inputRef}
        />
        <button type="submit" className="btn-add">
          Add
        </button>
      </form>
      <NotTask />
    </div>
  )
}
