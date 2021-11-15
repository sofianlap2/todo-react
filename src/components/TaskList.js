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


function TaskList({
    filteredTodos,
    delteHandler, 
    completedHandler, 
    isEditing, 
    updateEdit, 
    handleEditInputChange, 
    setIsEditing
}) {

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Paper variant="outlined" square>
                    {filteredTodos && filteredTodos.map((todo) => 
                        <Grid key={todo.id} container direction="row" alignItems="center">
                        {isEditing === todo.id ?
                            (
                                <Grid item xs={8}>
                                    <FormControl>
                                        <Input onChange={handleEditInputChange}></Input>
                                        <Button type="submit" onClick={() => updateEdit(todo.id)}>EDIT</Button>
                                    </FormControl>
                                </Grid>
                            ) : 
                            (
                                <Grid item xs={8}>
                                    <ListItem className={todo.complete ? 'task-li' : ''}>
                                    <ListItemText>{todo.task}</ListItemText>
                                    </ListItem>
                                </Grid>
                            )
                        }
                        
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