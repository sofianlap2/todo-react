import './App.css';
import React, {useState} from 'react';
import data from './utils/data.json';
import './sass/todo.css';
import { useId } from "react-id-generator";

function App() {

  const [htmlId] = useId();
  const [tasksList, setTasksList] = useState(data);
  const [newTask, setNewTask] = useState({
    task : '',
    id : '',
    complete : '',
  });

  const onChangeHandler = (e) => {
    setNewTask({
      task : e.target.value,
      id: htmlId,
      complete : true
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setTasksList([...tasksList, newTask]);
    setNewTask({
      task: '',
    });
  }

  const delteHandler = (todo) => {
    setTasksList(tasksList.filter(oneTask => oneTask.id !== todo.id))
  }

  const editHandler = (id, newName) => {
    setTasksList(tasksList.map(singletask => {
      if (singletask.id === id) {
        singletask.task = newName;
      }
      return singletask;
    }));
  }

  const completedHandler = (id) => {
    setTasksList(tasksList.map(singletask => {
      if (singletask.id === id) {
        singletask.complete = !singletask.complete;
      }
      return singletask;
    }));
  }

  return (
    <div className="App">
      <h1>Todo app</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="task">add new task</label>
        <input value={newTask.task} id="task" name="task" placeholder="add task here" onChange={onChangeHandler}></input>
        <button>ADD</button>
      </form>
      {tasksList && tasksList.map(todo => (
        <ul key={todo.id}>
          <li className={todo.complete ? 'task-li' : ''}>
            {todo.task}
          </li>
            <button onClick={() => delteHandler(todo)}>Delete</button>
            <button onClick={() => editHandler(todo.id, 'john')}>Edit</button>
            <button onClick={() => completedHandler(todo.id)}>{todo.complete? 'Completed' : 'todo' }</button>
        </ul>
      ))}
    </div>
  );
}

export default App;
