import {useState} from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from 'uuid';
export default function TodoList() {
let [todos, setTodos] = useState([{task : "sample Task", id: uuidv4(), isDone : false}]);
let [newTodo, setNewTodo] = useState("");
   
    let addNewTask = () => {
        if(newTodo.trim() !== ""){
           setTodos((prevTodos) => {
            return [...prevTodos, {task : newTodo, id : uuidv4(), isDone : false}];
           });
         setNewTodo("");
        }
    };
    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }
   let deleteTodo = (id) => {
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
}

let MarkAllAsDone = () => {
    setTodos((todos) =>
        todos.map((todo) => {
            return {
                ...todo,
                isDone : true,
            };
        })
    )
}

let MarkAsDone = (id) => {
     setTodos((prevtodos) => 
        prevtodos.map((todo) => {
            if(todo.id == id) {
                return {
                    ...todo,
                    isDone : true,
                };
            } else {
                return todo;
            }
        })
    );
};
let lineThrough = {
    textDecoration: "line-through"
};

   return (
  <div className="todo-container">
    <input
      className="todo-input"
      placeholder="Add a task"
      value={newTodo}
      onChange={updateTodoValue}
    />
    <button className="todo-button" onClick={addNewTask}>
      Add Task
    </button>

    <h4>Tasks Todo</h4>
    <ul className="todo-list">
      {todos.map((todo) => (
        <li className="todo-item" key={todo.id}>
          <span
            className={`todo-text ${todo.isDone ? "done" : ""}`}
          >
            {todo.task}
          </span>
          <div className="todo-actions">
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => MarkAsDone(todo.id)}>Mark As Done</button>
          </div>
        </li>
      ))}
    </ul>
    <button className="todo-button mark-all-button" onClick={MarkAllAsDone}>
      Mark All As Done
    </button>
  </div>
);
}