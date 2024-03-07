import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from '../../../context/GlobalContext';
import { Button } from "../../../components/Shared/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import { ContentHeader } from '../../../components/Shared/ContentHeader'
import './tasks_style.css';
const MySwal = withReactContent(Swal);

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function TasksPage() {
    const [todolist_tasks, setToDoListTasks] = useState([]);
    const { setActiveBlur } = useContext(GlobalContext)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleDeleteClick = (todo_id) => {
        setActiveBlur(true);
        MySwal.fire({
            icon:'warning',
            title: `Are you Sure?`,
            text: 'Do you want to delete this to do task ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes, I want to delete it.',
            denyButtonText: `No, I want to keep it`,
            backdrop: true,
            customClass: {
                popup: 'popup-sweet',
                title: 'title-sweet',
                htmlContainer: 'text-sweet',
                confirmButton: 'confirm-button-sweet',
                denyButton: 'deny-button-sweet',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                todolist_tasks.splice(todo_id,1);
                localStorage.setItem("Tasks", JSON.stringify(todolist_tasks));
                setActiveBlur(true);
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'To Do Task Deleted.',
                    showConfirmButton: false,
                    timer: 1700,
                    backdrop: true,
                    customClass: {
                        popup: 'popup-sweet',
                        title: 'title-sweet',
                        htmlContainer: 'text-sweet',
                        confirmButton: 'confirm-button-sweet',
                        denyButton: 'deny-button-sweet',
                    }
                }).finally(() => {setActiveBlur(false)});
                fetchData();
            }
        }).finally(() => {setActiveBlur(false)});
    };

    const handleAddToDoTask = async() => {
        try{
            todolist_tasks.push({description: inputValue, status:"Active"});
            localStorage.setItem("Tasks", JSON.stringify(todolist_tasks));
            setActiveBlur(true);
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: 'To Do List Task Saved.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
            setInputValue('');
            fetchData();
        }catch(err){
            console.error(err);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error adding the new task, please contact support.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
    }

    const handleUpdateStatus = async (id, value) => {
        try{
            todolist_tasks[id].status = value ? "Completed":"Active";
            localStorage.setItem("Tasks", JSON.stringify(todolist_tasks));
            fetchData();
        }catch(err){
            console.error(err);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error updating the task, please contact support.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
    }

    const fetchData = async () => {
        try {
            let newRows = JSON.parse(localStorage.getItem("Tasks")) === null ? [] : JSON.parse(localStorage.getItem("Tasks"));
            setToDoListTasks(newRows);
        } catch (error) {
            console.error(error);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error retrieving the tasks, please contact support.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleAddToDoTask();
        }
      }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="todo-general-container">
                <ContentHeader text="Tasks" />
                {todolist_tasks.length > 0 ? 
                    <div className="list-task">
                        <List sx={{ width: '100%' }}>
                            {todolist_tasks.map((option, index) => {
                                const labelId = `item-list-label-${option}`;
                                return (
                                <div key={index}>
                                    <ListItem className="task-item" disablePadding secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => {handleDeleteClick(index);}}>
                                            <DeleteIcon className="icon-color"/>
                                        </IconButton>
                                    }>
                                        <ListItemIcon className="task-checkbox-container">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={option.status === "Active" ? false : true}
                                                        style ={{
                                                            color: "#5873FE",
                                                        }}
                                                        onChange={e => handleUpdateStatus(index, e.target.checked)}
                                                    />
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={option.description} className={option.status === "Completed" ? 'linethrough' : ''}  secondary={`Status: ${option.status}`}/>
                                    </ListItem>
                                </div>
                                );
                            })}
                        </List>
                    </div>
                : <Box sx={{ width: '100%' }} style={{ display: 'flex', justifyContent: 'center', margin:'17px' }}>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            You don't have any task in the list
                        </Typography>
                    </Box>
                }
                <div className="todo-add-button-container">
                    <OutlinedInput className="inputTodo" type="text" placeholder="Type the task you need" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <Button
                        buttonClassName="todo-add-button"
                        onClick={() => handleAddToDoTask() }
                        children="Add Task"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export { TasksPage };