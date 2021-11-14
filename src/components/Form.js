import { Button } from '@mui/material';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


function Form({onSubmitHandler, newTask, onChangeHandler, status, selectChangeHandler}) {
    return (
        <form onSubmit={onSubmitHandler}>
            <Grid container justifyContent="center" alignItems="center" direction="row">
                <Grid item >
                    <TextField size="small" color="primary" value={newTask.task} id="task" name="task" placeholder="add task here" onChange={onChangeHandler}></TextField>
                </Grid>

                <Grid item>
                    <Button type="submit" size="large" variant="contained">ADD</Button>
                </Grid>

                <Grid item>
                    <Select variant="outlined" size="small" value={status} onChange={selectChangeHandler} name="status" id="status">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="uncompleted">Not completed</MenuItem>
                    </Select>
                </Grid>
        </Grid>
            </form>
    )
}

export default Form
