import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function App() {
  const [animList] = useAutoAnimate();
  //stringify -> Convertir objeto a cadena JSON | parse -> Convertir cadena JSON a objeto
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todo-list')) || []
  );
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    let tempTodoList = [...todoList]; //no podemos manejar directamente la lista, al set hay que darle la lista definitiva
    tempTodoList.push(newTask);
    setTodoList(tempTodoList);
    setNewTask('');
    localStorage.setItem('todo-list', JSON.stringify(tempTodoList));
  };

  const removeTask = (task) => {
    let tempTodoList = [...todoList];
    tempTodoList = tempTodoList.filter((t) => t !== task);
    setTodoList(tempTodoList);
    localStorage.setItem('todo-list', JSON.stringify(tempTodoList));
  };

  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TO-DO
          </a>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nueva tarea ... "
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => addTask()}
          >
            <i className="ri-add-line"></i>
          </button>
        </div>

        <h3>Tareas pendientes</h3>
        {todoList.length === 0 && (
          <div className="alert alert-secondary" role="alert">
            No tienes tareas pendientes
          </div>
        )}
        <ul className="list-group" ref={animList}>
          {todoList.map((task, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ textAlign: 'center' }}
            >
              {task}{' '}
              <i
                className="ri-delete-bin-6-line btn btn-danger btn-sm"
                onClick={() => removeTask(task)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
