import React from 'react'

type FormProps = {
  handleSubmitForm: (e: { preventDefault: () => void }) => void
  inputValue: string
  setInputValue: (newTask: string) => void
  inputRef: React.RefObject<HTMLInputElement> // revisar
}
export function Form({
  handleSubmitForm,
  inputValue,
  setInputValue,
  inputRef,
}: FormProps) {
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleSubmitForm} className="form">
        <input
          type="text"
          value={inputValue}
          placeholder="Digite sua tarefa"
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          maxLength={28}
          required
        />
        <button type="submit" className="btn">
          adicionar
        </button>
      </form>
    </div>
  )
}
