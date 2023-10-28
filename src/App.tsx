import { useEffect, useReducer, useRef, useState, type Key } from 'react';

import { reducer } from './services/formService';
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from './services/taskService';

import { Form } from './components/Form';
import { CreateTask } from './components/task/CreateTask';
import { NoTask } from './components/task/NoTask';

export function App() {
  // Estado para o valor de entrada no formulário
  const [inputValue, setInputValue] = useState('');

  // Utilização de useReducer para gerenciar o estado das tarefas
  const [tasks, dispatch] = useReducer(reducer, loadTasksFromLocalStorage());

  // Referência ao elemento de entrada de texto
  const inputRef = useRef<HTMLInputElement>(null);

  // Manipulador de envio de formulário
  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue) {
      // Despachar uma ação para adicionar uma nova tarefa ao estado
      dispatch({
        type: 'add-task',
        payload: inputValue,
      });

      setInputValue(''); // Limpar o valor de entrada
      inputRef.current?.focus(); // Dar foco ao elemento de entrada de texto
    }
  }

  useEffect(() => {
    // Efeito para salvar tarefas no armazenamento local quando o estado muda
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  // Função para deletar uma tarefa com base em sua chave (id)
  const deleteTask = (taskId: Key | undefined) => {
    dispatch({
      type: 'delete-task',
      payload: taskId,
    });
  }

  return (
    <main className="main-container">
      <section className="container">
        {/* Componente Form para entrada de tarefa */}
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
              // Componente CreateTask para exibir tarefas individuais
              <CreateTask key={task.id} task={task} deleteTask={deleteTask} />
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}
