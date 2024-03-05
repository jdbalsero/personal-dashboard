import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../../context/GlobalContext';
// import ApiMiddleware from "../../../components/Shared/ApiMiddleware";
import { Button } from "../../../components/Shared/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import './ToDoListPage.css';
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
                localStorage.setItem('Tasks',todolist_tasks);
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
                // fetchData();
            }
        }).finally(() => {setActiveBlur(false)});
    };

    const handleAddToDoTask = async() => {
        console.log(inputValue);
        try{
            todolist_tasks.append({description: inputValue, status:"Active"});
            localStorage.setItem('Tasks', todolist_tasks);
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
            // fetchData();
        }catch(err){
            console.error(err);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was a unexpected error, please contact support.',
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

    const compare = (a,b) => {
        if ( a.description < b.description ){
            return -1;
        }
        if ( a.description > b.description ){
            return 1;
        }
        return 0;
    }

    const fetchData = async () => {
        try {
            const newRows = localStorage.getItem('Tasks');
            newRows.sort(compare);
            setToDoListTasks(newRows);
        } catch (error) {
            console.error(error);
            // Manejar el error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="todo-general-container">
                <p className="todo-title">Tasks</p>
                {todolist_tasks.length > 0 ? 
                    <div className="list-todo">
                        <List sx={{ width: '100%' }}>
                            {todolist_tasks.map((option, index) => {
                                const labelId = `item-list-label-${option}`;
                                return (
                                <div key={option.id}>
                                    <ListItem className="todo-item" disablePadding secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => {handleDeleteClick(index);}}>
                                            <DeleteIcon className="icon-color"/>
                                        </IconButton>
                                    }>
                                        <ListItemIcon className="icon">
                                            <RadioButtonCheckedIcon className="icon-color2"/>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={option.description} secondary={`Status: ${option.status ? "Completed" : "Active"}`}/>
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
                    <OutlinedInput className="inputTodo" type="text" placeholder="Type the task you need" value={inputValue} onChange={handleChange} />
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