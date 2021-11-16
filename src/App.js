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
import {ErrorBoundary} from 'react-error-boundary';

function App() {

  //**CONSTANTS */
  const [isEditing, setIsEditing] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({});
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
  }, [status, tasksList]);
  
  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [status, tasksList]);

  const onChangeHandler = (e) => {
    setNewTask({
      task : e.target.value,
      id: tasksList.length + Math.random() * 100,
      complete : false
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

  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }
    
  const updateEdit = (id) => {
    setTasksList(tasksList.map(todo => {
      if (todo.id === id) {
        todo.task = currentTodo.text;
      }
      return todo;
  }))
    setIsEditing(null);
    setCurrentTodo({});
  }

  const cancelEdit = () => {
    setIsEditing(null);
    setCurrentTodo({});
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

  function ErrorFallback({error}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{color: 'red'}}>{error.message}</pre>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
              completedHandler={completedHandler} 
              tasksList={tasksList}
              setTasksList={setTasksList}
              isEditing={isEditing}
              updateEdit={updateEdit}
              handleEditInputChange={handleEditInputChange}
              setIsEditing={setIsEditing}
              cancelEdit={cancelEdit}
            />

          </Stack>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
}

export default App;
