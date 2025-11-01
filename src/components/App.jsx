import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import ToDoList from "./ToDoList.jsx";
import "../App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("api/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoList(data);
      });
  }, []);

  return (
    <div>
      <Header />
      <ToDoList listItems={todoList} />

      <form action="/api/todos/">
        <input type="text" name="newToDo"></input>
        <input type="submit" value="Add" />
      </form>
    </ div>
  );
}

export default App;
