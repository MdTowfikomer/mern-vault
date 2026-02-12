import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let removeList = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodos) => prevTodos.id !== id),
    );
  };

  let upperCase = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      });
    });
  };
  let upperCaseOne = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      });
    });
  };

  let markDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
    });
  };

  let allMarkDone = ()=>{
    setTodos((prevTodos)=>{
      return prevTodos.map((todo)=>{
        return{
          ...todo,
          isDone: !todo.isDone,
        }
      });
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the Task"
        onChange={updateTodoValue}
        value={newTodo}
      />
      <br />
      <button onClick={addNewTask}>Add Task</button>
      <br />
      <br />
      <br />
      <hr />
      <h4>Test Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>
              {todo.task}
            </span>{" "}
            &nbsp;
            <button onClick={() => upperCaseOne(todo.id)}>Upper Case</button>
            <button onClick={() => removeList(todo.id)}>Delete</button>
            <button onClick={() => markDone(todo.id)}>Mark as Done!</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <button onClick={allMarkDone}>Mark All as Done!</button>
      <button onClick={upperCase}>To Upper Case</button>
    </div>
  );
}
