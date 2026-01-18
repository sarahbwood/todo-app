import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ToDoList from "./ToDoList.jsx";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    accessToken: "",
  });

  return (
    <StyledEngineProvider injectFirst>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

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
          <ToDoList userId={user.userId} />
        )}
      </div>
      <p>
        Photo by{" "}
        <a href="https://unsplash.com/@codioful?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Codioful (Formerly Gradienta)
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/pink-and-yellow-color-illustration-1TCjZz-dnJc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </StyledEngineProvider>
  );
}

export default App;
