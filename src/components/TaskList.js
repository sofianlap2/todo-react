import React from 'react';
import TaskCard from './TaskCard';

function TaskList({filteredTodos, delteHandler, editHandler, completedHandler}) {
    return (
        <div>
            {filteredTodos && filteredTodos.map(todo => (
                <TaskCard 
                key={todo.id} 
                todo={todo} 
                delteHandler={delteHandler} 
                editHandler={editHandler} 
                completedHandler={completedHandler}/>
            ))}
        </div>
    )
}

export default TaskList
