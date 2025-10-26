function ToDo(props){
    return (
        <div>
            <label>{props.title}</label>
            <input type="checkbox" checked={props.isCompleted}/>
        </div>
    );
}

export default ToDo;