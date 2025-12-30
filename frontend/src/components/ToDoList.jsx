import { useState, useEffect } from "react";
import { List } from "@mui/material";
import axios from "axios";
import ToDo from "./ToDo.jsx";
import ToDoInputForm from "./ToDoInputForm.jsx";

function ToDoList(props) {
  const [todoList, setTodoList] = useState([]);

  function getTodoList() {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = props.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance
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
        accessToken={props.accessToken}
      />
    </>
  );
}

export default ToDoList;
