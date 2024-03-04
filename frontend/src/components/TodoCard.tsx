
import {Todo} from "./Todo.ts";
import axios from "axios";

type Props = {
    todo: Todo,
    ifTodoItemChanged: () => void
}

export default function TodoCard(props: Props) {

    function deleteItem() {
        axios.delete('/api/todo/' + props.todo.id)
            .then(props.ifTodoItemChanged)
    }

    return (
        <div className="todo-card">
            {props.todo.description}
            <button onClick={deleteItem}>Delete</button>

        </div>
    )
}