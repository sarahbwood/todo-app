import { useState, useEffect } from "react";
import axios from "axios";
import ToDo from "./ToDo.jsx";
import ToDoInputForm from "./ToDoInputForm.jsx";

function ToDoList(props) {
  const [todoList, setTodoList] = useState([]);

  function getTodoList() {
    axios
      .get("/api/todos")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTodoList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      {todoList.map((toDo) => (
        <ToDo
          key={toDo[0].id}
          title={toDo[0].title}
          completed={toDo[0].completed}
          id={toDo[0].id}
          refreshTodoList={getTodoList}
        />
      ))}
      <ToDoInputForm userId={props.userId} refreshTodoList={getTodoList} />
    </>
  );
}

export default ToDoList;
