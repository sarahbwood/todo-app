import { useState, useEffect } from "react";
import { List } from "@mui/material";
import axios from "axios";
import ToDo from "./ToDo.jsx";
import ToDoInputForm from "./ToDoInputForm.jsx";

function ToDoList(props) {
  const [todoList, setTodoList] = useState([]);

  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = "csrf_access_token";
  axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

  function getTodoList() {
    axios
      .get("/api/todos")
      .then((response) => {
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
      <List>
        {todoList.map((toDo) => (
          <ToDo
            key={toDo[0].id}
            title={toDo[0].title}
            completed={toDo[0].completed}
            id={toDo[0].id}
            refreshTodoList={getTodoList}
          />
        ))}
      </List>

      <ToDoInputForm
        refreshTodoList={getTodoList}
      />
    </>
  );
}

export default ToDoList;
