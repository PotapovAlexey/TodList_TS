import {FilterValuesType, TodoListType} from "../App"
import {v1} from "uuid";

type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string

}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case "CHANGE-TODOLIST-FILTER":
            const todolist2 = state.find(tl => tl.id === action.id);
            if (todolist2) {
                todolist2.filter = action.filter;
                return [...state];
            }
            return state
        default:
            throw new Error("I dont understand this action type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodoListFilterAC = (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todoListID, filter: newFilter}
}
export const ChangeTodoListTitleAC = (todoListID: string, newTodolistTitle: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: newTodolistTitle}
}
