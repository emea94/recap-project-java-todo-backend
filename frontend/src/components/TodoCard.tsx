
import {Todo} from "./Todo.ts";
import axios from "axios";
import {ChangeEvent, useState} from "react";

type Props = {
    todo: Todo,
    ifTodoItemChanged: () => void
}

export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description)

    function deleteItem() {
        axios.delete('/api/todo/' + props.todo.id)
            .then(props.ifTodoItemChanged)
    }

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value
        setDescription(newDescription)
        axios.put('/api/todo/' + props.todo.id,{
            ...props.todo,
            description,
        } as Todo)
    }

    return (
        <div className="todo-card">
            <input value={description} onInput={changeText}/>
            <button onClick={deleteItem}>Delete</button>

        </div>
    )
}