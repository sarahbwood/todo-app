import { useState } from "react";
import axios from "axios";

function ToDo(props) {
  const [todo, setTodo] = useState({
    title: props.title,
    completed: props.completed,
    id: props.id,
  });

  function updateCompletedStatus(e) {
    const isCompleted = e.target.checked;
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        completed: isCompleted,
      };
    });

    axios.patch(
      `/api/todos/${todo.id}`,
      {
        title: todo.title,
        completed: todo.completed,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
        console.log(response);
        if (response.status === 200) {
            props.refreshTodoList();
        }
    })
    .catch((error) => {
        console.log(error);
    });
  }

  return (
    <div>
      <label>{todo.title}</label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={updateCompletedStatus}
      />
    </div>
  );
}

export default ToDo;
