import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function TaskCard({todo, delteHandler, editHandler, completedHandler}) {

    return (
        <List>
            <ListItem className={todo.complete ? 'task-li' : ''}>
              <ListItemText>{todo.task}</ListItemText>
            </ListItem>
            <DeleteIcon 
                color="secondary" 
                onClick={() => delteHandler(todo)}
            />
            <ModeEditIcon size="small" variant="contained" onClick={() => editHandler(todo.id, 'john')}>Edit</ModeEditIcon>
            <CheckCircleIcon size="small" variant="contained" onClick={() => completedHandler(todo.id)}>{todo.complete? 'Completed' : 'todo' }</CheckCircleIcon>
        </List>
    )
}
