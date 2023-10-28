type Task = {
  id: number
  value: string
  isCompleted: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// não consegui tipar o payload corretamente
export function reducer(state: Task[], action: { type: any; payload: any }) {
  switch (action.type) {
    case 'add-task': {
      return [
        ...state,
        {
          id: Date.now(), // Gera um ID único com base na data atual
          value: action.payload,  // O valor da nova tarefa 
          isCompleted: false,  // A tarefa é inicialmente definida como não concluída
        },
      ]
    }

    case 'delete-task': {
      return state.filter((task) => task.id !== action.payload)
    }

    default: {
      //Em caso de uma ação inesperada retorna o estado
      return state
    }
  }
}
