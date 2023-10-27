type Task = {
  id: number
  value: string
  isCompleted: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reducer(state: Task[], action: { type: any; payload: any }) {
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
