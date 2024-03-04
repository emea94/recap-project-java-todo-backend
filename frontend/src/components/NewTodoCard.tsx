import {ChangeEvent, useState} from "react";
import axios from "axios";
import {Todo} from "./Todo.ts";

type Props = {
    ifTodoItemChanged: () => void
}

export default function NewTodoCard(props: Props) {

    const [text, setText] = useState('')

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function saveTodo() {
        setText('')
        axios.post('/api/todo',
            {
                description: text,
                status: 'OPEN',
            } as Todo)
            .then(props.ifTodoItemChanged)
    }


    return (
        <div className="todo-card-new">
            <input type={"text"} value={text} onInput={changeText}/>
            <button onClick={saveTodo}>Save</button>
        </div>
    );
}

