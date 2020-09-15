import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./TodoList.module.css";
import {IconButton, TextField,} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {  // типизируем e как ChangeEvent....
        setError("")
        setTitle(e.currentTarget.value)
    }


    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addNewTask()
        }
    }


    const addNewTask = () => {
        if (title.trim()) {                 // Проверка,чтобы нельзя было добавить пустой таск
            props.addItem(title.trim());   // .trim чтобы нельзя было заполнять input пробелами
            setTitle("");            // затираем input пустыми кавычками ""
        } else {
            setError("Title is required!")
        }

    }


    return (
        <div>
            <TextField
                variant={"outlined"}
                placeholder="Add task"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                error={!!error}
                helperText={error}
                label={"Title"}
            />

            <IconButton
                color={"primary"}
                onClick={addNewTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm