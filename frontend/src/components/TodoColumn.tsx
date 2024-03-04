import TodoCard from "./TodoCard.tsx";
import {Todo} from "./Todo.ts";
import {TodoStatus} from "./TodoStatus.ts";
import NewTodoCard from "./NewTodoCard.tsx";

type Props = {
    todos: Todo[],
    status: TodoStatus,
    ifTodoItemChanged: () => void,
}

export default function TodoColumn(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard todo={todo} key={todo.id} ifTodoItemChanged={props.ifTodoItemChanged}/>)
            }
            {
                (props.status === "OPEN") && <NewTodoCard ifTodoItemChanged={props.ifTodoItemChanged}/>
            }
        </div>
    );
}

