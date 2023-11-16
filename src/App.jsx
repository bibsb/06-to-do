import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import _ from 'lodash';
import './App.css';

function App() {
  const [animList] = useAutoAnimate();
  //stringify -> Convertir objeto a cadena JSON | parse -> Convertir cadena JSON a objeto
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('todo-list')) || []
  );
  const [newTask, setNewTask] = useState('');
  const [categories] = useState(['Compras', 'Estudiar', 'Miscelania']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredCategory, setFilteredCategory] = useState(categories[0]);

  const addTask = () => {
    let tempTodoList = [...todoList]; //no podemos manejar directamente la lista, al set hay que darle la lista definitiva
    tempTodoList.push({
      id: Date.now(),
      name: newTask,
      category: selectedCategory,
    });
    setTodoList(tempTodoList);
    setNewTask('');
    localStorage.setItem('todo-list', JSON.stringify(tempTodoList));
  };

  const removeTask = (taskId) => {
    let tempTodoList = [...todoList];
    tempTodoList = tempTodoList.filter((task) => task.id !== taskId);
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
          <a className="navbar-brand">
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
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {selectedCategory}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {categories.map((category, i) => (
              <li key={i}>
                <a
                  className="dropdown-item"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => addTask()}
          >
            <i className="ri-add-line"></i>
          </button>
        </div>
        <div id="container">
          <div className="row align-items-center mb-3">
            <div className="col">
              <h3>Tareas pendientes: {filteredCategory}</h3>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-outline-secondary me-2"
                type="button"
                onClick={() => setFilteredCategory('Todas')}
              >
                Todas
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-bs-toggle="dropdown"
              >
                {filteredCategory}
                <i className="ri-search-line ms-3"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {categories.map((category, i) => (
                  <li key={i}>
                    <a
                      className="dropdown-item"
                      onClick={() => setFilteredCategory(category)}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {todoList.length === 0 && (
            <div className="alert alert-secondary" role="alert">
              No tienes tareas pendientes
            </div>
          )}
          <ul className="list-group" ref={animList}>
            {todoList
              .filter(
                (task) =>
                  filteredCategory === 'Todas' ||
                  filteredCategory === task.category 
              )
              .map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ textAlign: 'center' }}
                >
                  {task.name}
                  <div>
                    <span>{task.category}</span>
                    <i
                      className="ri-delete-bin-6-line btn btn-danger btn-sm ms-3"
                      onClick={() => removeTask(task.id)}
                    ></i>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
