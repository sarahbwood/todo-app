import ToDo from "./ToDo";

function ToDoList(props){
    const toDoListItems = props.listItems;
    const toDoList = toDoListItems.map(toDo => 
        <ToDo title={toDo.title} isCompleted={toDo.isCompleted}/>
    );

    return toDoList;

}

export default ToDoList;