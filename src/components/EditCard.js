import React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function EditCard({todo}) {
    return (
        <Grid item xs={8}>
            <ListItem className={todo.complete ? 'task-li' : ''}>
                <ListItemText>{todo.task}</ListItemText>
            </ListItem>
        </Grid>
    )
}

export default EditCard
