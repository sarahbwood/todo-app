import ToDo from "./ToDo.jsx";

function ToDoList(props){
    const toDoListItems = props.listItems;
    const toDoList = toDoListItems.map(toDo => 
        <ToDo key={toDo[0].id} title={toDo[0].title} completed={toDo[0].completed}/>
    );

    return toDoList;

}

export default ToDoList;