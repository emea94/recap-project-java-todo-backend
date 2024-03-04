
import {Todo} from "./Todo.ts";
import axios from "axios";
import {ChangeEvent, useState} from "react";
import {TodoStatus} from "./TodoStatus.ts";

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

    function move(currentStatus: TodoStatus) {
        axios.put('/api/todo/' + props.todo.id,{
            ...props.todo,
            status: currentStatus,
        } as Todo)
            .then(props.ifTodoItemChanged)
    }


    return (
        <div className="todo-card">
            <input value={description} onInput={changeText}/>
            {
                props.todo.status === "OPEN"
                    ? <div></div>
                    : (
                        props.todo.status === "IN_PROGRESS"
                            ? <button onClick={() => move("OPEN")}>Move</button>
                            : <button onClick={() => move("IN_PROGRESS")}>Move</button>
                    )
            }
            <button onClick={deleteItem}>Delete</button>
            {
                props.todo.status === "DONE"
                    ? <div></div>
                    : (
                        props.todo.status === "OPEN"
                        ? <button onClick={() => move("IN_PROGRESS")}>Move</button>
                        : <button onClick={() => move("DONE")}>Move</button>
                    )
            }
        </div>
    )
}