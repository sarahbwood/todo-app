import { useState } from "react";
import axios from "axios";

function Register(props) {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    setRegistrationData((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function registerUser(e) {
    e.preventDefault();

    if (registrationData.password === registrationData.confirmPassword) {
      axios
        .post(
          "/api/register",
          {
            username: registrationData.username,
            password: registrationData.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            props.onRegistration(true);
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
  }

  return (
    <>
      <form onSubmit={registerUser}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={registrationData.username}
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={handleChange}
        />
        <br />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={registrationData.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {!(registrationData.password === registrationData.confirmPassword) && (
        <p style={{ color: "red" }}>Passwords do not match.</p>
      )}
    </>
  );
}

export default Register;
