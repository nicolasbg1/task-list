/* responsável por verificar se existem tarefas armazenadas
no armazenamento local e retornar essas tarefas
como um array de objetos, ou um array vazio se
não houver tarefas armazenadas. */
export function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
}




/*converte o array de tarefas em uma string JSON usando JSON.stringify(),
e armazena essa string no armazenamento
local do navegador com a chave 'tasks'. */
export function saveTasksToLocalStorage(tasks: unknown[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
