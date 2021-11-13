import React from 'react';
import Button from '@mui/material/Button';

export default function TaskCard({todo, delteHandler, editHandler, completedHandler}) {

    return (
        <ul>
            <li className={todo.complete ? 'task-li' : ''}>
              {todo.task}
            </li>
            <Button size="small"  variant="contained" onClick={() => delteHandler(todo)}>Delete</Button>
            <Button size="small" variant="contained" onClick={() => editHandler(todo.id, 'john')}>Edit</Button>
            <Button size="small" variant="contained" onClick={() => completedHandler(todo.id)}>{todo.complete? 'Completed' : 'todo' }</Button>
        </ul>
    )
}
