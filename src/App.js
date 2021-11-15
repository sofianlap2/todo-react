import './App.css';
import React, {useState, useEffect} from 'react';
import data from './utils/data.json';
import './sass/todo.scss';
import Form from './components/Form';
import TaskList from './components/TaskList';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

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

  return (
    <Container className="App">
      <Grid container height="100vh" direction="column" alignItems="center" justifyContent="center">
        <Stack marginTop="50px" border="1px solid grey" padding={4} spacing={2} justifyContent="center" textAlign="center">
          <Typography variant="h1" sx={{ fontSize: {xs:35, sm:70 } }}>Todo app</Typography>

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

        </Stack>
      </Grid>
    </Container>
  );
}

export default App;
