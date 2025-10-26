import { useState, useEffect } from 'react'
import Header  from './components/Header.jsx'
import ToDo from './components/ToDo.jsx';
import ToDoList from './components/ToDoList.jsx';
import './App.css'

function App() {
  const testList = [{title: "Buy milk", isCompleted: true}, {title: "Wash car"}, {title: "Call Anna"}];
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(()=>{
    fetch('backend/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <>
    <Header/>
    <ToDoList listItems={testList}/>
      <p>The current time is : {new Date(currentTime * 1000).toLocaleString()}</p>
     
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
    </>
  )
}

export default App;
