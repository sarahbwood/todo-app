import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginData((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function setIsNotRegistered() {
    props.setIsRegistered(false);
  }

  function authenticateUser(e) {
    e.preventDefault();
    axios
      .post(
        "/api/login",
        {
          username: loginData.username,
          password: loginData.password,
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
          props.onLogin(true);
          props.setUser({
            userId: response.data.user_id,
            username: response.data.username,
            accessToken: response.data.access_token,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form onSubmit={authenticateUser}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <p onClick={setIsNotRegistered}>No account? No problem! Register here.</p>
    </>
  );
}

export default Login;
