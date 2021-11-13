import React from 'react';

function Form({onSubmitHandler, newTask, onChangeHandler, status, selectChangeHandler}) {
    return (
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="task">add new task</label>
            <input value={newTask.task} id="task" name="task" placeholder="add task here" onChange={onChangeHandler}></input>
            <button>ADD</button>
            <select value={status} onChange={selectChangeHandler} name="status" id="status">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Not completed</option>
            </select>
        </form>
    )
}

export default Form
