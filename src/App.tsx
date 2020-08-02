import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    function removeTasks(id: number) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasks}
                      removeTask={removeTasks}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

