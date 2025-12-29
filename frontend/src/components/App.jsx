import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ToDoList from "./ToDoList.jsx";
import { StyledEngineProvider } from "@mui/material/styles";
import "../App.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    username: "",
    accessToken: "",
  });

  return (
    <StyledEngineProvider injectFirst>
      <Header isLoggedIn={isLoggedIn} user={user} />

      <div className="content">
        {!isLoggedIn && isRegistered && (
          <Login
            onLogin={setIsLoggedIn}
            setUser={setUser}
            setIsRegistered={setIsRegistered}
          />
        )}
        {!isLoggedIn && !isRegistered && (
          <Register
            onRegistration={setIsRegistered}
            onLogin={setIsLoggedIn}
            setUser={setUser}
          />
        )}

        {isLoggedIn && (
          <ToDoList userId={user.userId} accessToken={user.accessToken} />
        )}
      </div>
    </StyledEngineProvider>
  );
}

export default App;
