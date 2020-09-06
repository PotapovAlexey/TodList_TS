import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import style from "./TodoList.module.css"
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    id: string                         //типизирование пропсов
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeButtonFilter: (value: FilterValuesType, todoListID: string) => void
    changeCheckboxStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    const onClickButtonAllHandler = () => {
        props.changeButtonFilter("all", props.id)
    }
    const onClickButtonActiveHandler = () => {
        props.changeButtonFilter("active", props.id)
    }
    const onClickButtonCompletedHandler = () => {
        props.changeButtonFilter("completed", props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    return (
        <div className={style.todoList}>
            <h2>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>

                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>X
                </button>
            </h2>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const removeTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckboxStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return (

                            <div key={t.id} className={t.isDone ? style.is_done : style.tasks}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeCheckboxStatus}
                                />
                                <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                                <button onClick={removeTask}>x</button>
                            </div>
                        )
                    })
                }
            </div>
            <div>

                <button
                    onClick={onClickButtonAllHandler}
                    className={props.filter === "all" ? style.active_filter : ""}
                >All
                </button>
                <button
                    onClick={onClickButtonActiveHandler}
                    className={props.filter === "active" ? style.active_filter : ""}
                >Active
                </button>
                <button
                    onClick={onClickButtonCompletedHandler}
                    className={props.filter === "completed" ? style.active_filter : ""}
                >Completed
                </button>
            </div>
        </div>
    )
}
export default TodoList