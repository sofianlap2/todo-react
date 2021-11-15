import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import todo from '../sass/todo.scss'
import CancelIcon from '@mui/icons-material/Cancel';

function TaskList({
    filteredTodos,
    delteHandler, 
    completedHandler, 
    isEditing, 
    updateEdit, 
    handleEditInputChange, 
    setIsEditing,
    cancelEdit
}) {

    const enterEditMode = (todo) => {
        if (todo.id === isEditing) {
            return(
                <Grid container xs={8} alignItems="center">
                    <Grid item xs={8}>
                        <TextField size="small"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => updateEdit(todo.id)}>edit</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <CancelIcon onClick={cancelEdit}>Cancel</CancelIcon>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid item xs={8}>
                    <ListItem className={todo.complete ? 'task-li' : ''}>
                        <ListItemText>{todo.task}</ListItemText>
                    </ListItem>
                </Grid>
            )
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Paper variant="outlined" square>
                    {filteredTodos && filteredTodos.map((todo) => 
                        <Grid key={todo.id} container direction="row" alignItems="center">
    
                        {enterEditMode(todo)}
                        
                        <Grid item xs={4} >
                        <DeleteIcon 
                            color="primary"
                            onClick={() => delteHandler(todo)}
                        />
                        <ModeEditIcon size="small" variant="contained" 
                        onClick={() => setIsEditing(todo.id)}
                        >
                            Edit
                        </ModeEditIcon>
                        <CheckCircleIcon size="small" variant="contained" onClick={() => completedHandler(todo.id)}>{todo.complete? 'Completed' : 'todo' }</CheckCircleIcon>
                        </Grid>
            
                        </Grid>
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TaskList;