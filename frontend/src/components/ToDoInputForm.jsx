import { useState } from "react";
import axios from "axios";

function ToDoInputForm(props) {
  const [title, setTitle] = useState("");

  function handleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  function addTodo(e) {
    e.preventDefault();

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
      .post(
        "/api/todos",
        {
          title: title,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setTitle("");
          props.refreshTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
      ></input>
      <input type="submit" value="Add" />
    </form>
  );
}

export default ToDoInputForm;
