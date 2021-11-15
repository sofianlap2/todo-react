import React from 'react';
import TaskCard from './TaskCard';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function TaskList({filteredTodos, delteHandler, editHandler, completedHandler}) {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Paper variant="outlined" square>
                    {filteredTodos && filteredTodos.map(todo => (
                        <TaskCard 
                        key={todo.id} 
                        todo={todo} 
                        delteHandler={delteHandler} 
                        editHandler={editHandler} 
                        completedHandler={completedHandler}/>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TaskList
