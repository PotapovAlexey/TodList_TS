import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    changeValue?: (value: string) => void
}


function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        if (props.changeValue) {
            props.changeValue(title)
        }
    }

    return (editMode
            ? <input
                value={title}
                onBlur={deActivatedEditMode}
                autoFocus={true}
                onChange={onChange}
            />
            : <span onDoubleClick={activatedEditMode}>{props.value}</span>
    )
}

export default EditableSpan