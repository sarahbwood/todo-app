import { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/themes/material-ui.css";

function ToDo(props) {
  const [todo, setTodo] = useState({
    title: props.title,
    completed: props.completed,
    id: props.id,
  });
  const [editInline, setEditInline] = useState(false);

  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = "csrf_access_token";
  axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

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
          completed: isCompleted,
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
    Swal.fire({
      title: "Are you sure you want to delete this?",
      theme: "material-ui",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  function editTodo() {
    Swal.fire({
      title: "Edit",
      theme: "material-ui",
      input: "text",
      inputValue: todo.title,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodo((prevTodo) => {
          return {
            ...prevTodo,
            title: result.value,
          };
        });

        axios
          .patch(
            `/api/todos/${todo.id}`,
            {
              title: result.value,
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
    });
  }

  function updateTitle(e) {
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        title: e.target.value,
      };
    });
  }

  function enableInlineEditing() {
    setEditInline(true);
  }

  function editTodoInline() {
    axios
      .patch(
        `api/todos/${todo.id}`,
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
    setEditInline(false);
  }

  return (
    <ListItem>
      {editInline ? (
        <TextField
          value={todo.title}
          onChange={updateTitle}
          onBlur={editTodoInline}
          variant="filled"
        />
      ) : (
        <ListItemText primary={todo.title} onClick={enableInlineEditing} />
      )}
      <Checkbox checked={todo.completed} onChange={updateCompletedStatus} />
      <IconButton edge="end" onClick={editTodo}>
        <EditOutlined />
      </IconButton>
      <IconButton edge="end" onClick={deleteTodo}>
        <DeleteOutlined />
      </IconButton>
    </ListItem>
  );
}

export default ToDo;
