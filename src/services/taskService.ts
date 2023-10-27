export function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
}

export function saveTasksToLocalStorage(tasks: unknown[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
