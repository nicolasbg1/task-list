import { Key } from 'react'
import { FaTrash } from 'react-icons/fa6'

type DeleteTask = (taskId: Key | undefined | number) => void | Error

interface CreateTaskProps {
  task: {
    id: Key | undefined
    value?: string
  }
  deleteTask: DeleteTask
}

export function CreateTask({ task, deleteTask }: CreateTaskProps) {
  return (
    <>
      <li key={task.id} tabIndex={0} style={{ outline: 'none' }}>
        {task.value}
      </li>
      <button
        className="clearTask"
        title="Apagar atividade"
        onClick={() => {
          deleteTask(task.id)
        }}
      >
        <FaTrash />
      </button>
    </>
  )
}
