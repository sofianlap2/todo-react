import './App.css';
import React, {useState, useEffect} from 'react';
import data from './utils/data.json';
import './sass/todo.scss';
import Form from './components/Form';
import TaskList from './components/TaskList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  //**CONSTANTS */
  const [tasksList, setTasksList] = useState(data);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState('');
  const [newTask, setNewTask] = useState({
    task : '',
    id : '',
    complete : '',
  });

  //** Functions */

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [status, tasksList]);  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [status, tasksList]);

  const onChangeHandler = (e) => {
    setNewTask({
      task : e.target.value,
      id: tasksList.length + Math.random() * 100,
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

  const selectChangeHandler = (event) => {
    setStatus(event.target.value);
  }

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(tasksList.filter(task => task.complete === true));
        break;
      case 'uncompleted':
        setFilteredTodos(tasksList.filter(task => task.complete === false));
        break;
      default:
        setFilteredTodos(tasksList);
        break;
    }
  }

  const saveLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(tasksList));
  }

  const getLocalStorage = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'));
      setTasksList(localTodos);
    }
  }

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#134b30',
        darker: '#053e85',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Todo app</h1>
        <Form 
        onSubmitHandler={onSubmitHandler}
        onChangeHandler={onChangeHandler}
        status={status}
        selectChangeHandler={selectChangeHandler}
        newTask={newTask}
        />
        <TaskList 
        filteredTodos={filteredTodos} 
        delteHandler={delteHandler} 
        editHandler={editHandler} 
        completedHandler={completedHandler} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
