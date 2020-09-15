import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

};

 export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {


    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to do", filter: "all"},

    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListID2]: [
            {id: v1(), title: "Learn It-Incubator", isDone: true},
            {id: v1(), title: "Learn NativeJS", isDone: true},
            {id: v1(), title: "CodeWars", isDone: true},
            {id: v1(), title: "React Native", isDone: false},
            {id: v1(), title: "Some Information", isDone: false}]
    })

    function addTodoList(title: string) {
        let newTodoListID = v1()
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })

    }

    function removeTasks(id: string, todoListID: string) {
        let todoList = tasks[todoListID];
        tasks[todoListID] = todoList.filter(t => t.id !== id)
        setTasks({...tasks})
    }


    function changeButtonFilter(value: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }


    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList]
        setTasks({...tasks})

    }


    function changeCheckboxStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find((task: { id: string | boolean; }) => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(task => task.id === id)
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }

    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(newTodoLists)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function changeTodoListTitle(todoListID: string, newTitle: string,) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding:"10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodoList}
                                        addTask={addTask}
                                        removeTask={removeTasks}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeButtonFilter={changeButtonFilter}
                                        changeTodoListTitle={changeTodoListTitle}
                                        changeCheckboxStatus={changeCheckboxStatus}

                                    />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

