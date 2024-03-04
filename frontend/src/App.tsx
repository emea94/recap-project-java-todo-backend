import './App.css'
import {Todo} from "./components/Todo.ts";
import {useEffect, useState} from "react";
import TodoColumn from "./components/TodoColumn.tsx";
import {allPossibleTodos} from "./components/TodoStatus.ts";
import axios from "axios";


export default function App() {

    const [todos, setTodos] = useState<Todo[]>([])

    function fetchTodos() {
        axios.get('/api/todo')
            .then(response => {
                setTodos(response.data)
            })
    }

    useEffect(
        fetchTodos
        ,[])

    return (
        <>
            <h1>To-Do's:</h1>
            <div className="page">
                {
                    allPossibleTodos.map(status => {
                        const filteredTodos = todos.filter(todo => todo.status === status)
                        return <TodoColumn
                            status={status}
                            todos={filteredTodos}
                            ifTodoItemChanged={fetchTodos}
                            key={status}
                        />
                    })
                }
            </div>
        </>
    )
}

