import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import ToDoList from "./ToDoList.jsx";
import "../App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    username: "",
  });

  return (
    <>
      <Header isLoggedIn={isLoggedIn} user={user}/>

      {!isLoggedIn && <Login onLogin={setIsLoggedIn} setUser={setUser}/>}

      {isLoggedIn && <ToDoList  userId={user.userId}/>}
    </>
  );
}

export default App;
