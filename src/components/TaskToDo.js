import React from "react";
import "../App.css";
import SingleTodo from "./SingleTodo";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

const TaskToDo = () => {
  // get the required elements from redux store
  const todosReducer = useSelector((state) => state.todos);

  // filter out which has status is equal to todo
  const tasks = todosReducer.filter((todo) => todo.status === "todo");
  return (
    <Droppable droppableId="tasksTodo">
      {(provided) => (
        <div
          className="todoColumn"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3 style={{ marginTop: "10px" }}>Tasks to do</h3>
          <hr />
          
          {/* iterate the objects which has status 'todo' */}
          {tasks.map((todo, index) => (
            <SingleTodo key={todo.id} todo={todo} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskToDo;
