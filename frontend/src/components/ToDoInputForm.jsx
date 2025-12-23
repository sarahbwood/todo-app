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
    axios
      .post(
        "/api/todos",
        {
          title: title,
          user_id: e.target.user_id.value,
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
      <input type="hidden" name="user_id" value={props.userId} />
      <input type="submit" value="Add" />
    </form>
  );
}

export default ToDoInputForm;
