import { useState } from "react";
import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
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

    axios
      .patch(
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

  function deleteTodo() {
    axios
      .delete(`api/todos/${todo.id}`)
      .then((response) => {
        if (response.status === 200) {
          props.refreshTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ListItem>
      <ListItemText primary={todo.title} />
      <Checkbox checked={todo.completed} onChange={updateCompletedStatus} />
      <IconButton edge="end">
        <EditOutlined />
      </IconButton>
      <IconButton edge="end" onClick={deleteTodo}>
        <DeleteOutlined />
      </IconButton>
    </ListItem>
  );
}

export default ToDo;
