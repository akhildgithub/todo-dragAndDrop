import React from "react";
import "../App.css";
import SingleTodo from "./SingleTodo";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

const Completed = () => {
  // get the required elements from redux store
  const todosReducer = useSelector((state) => state.todos);

  // filter out which has status is equal to tasksDone
  const tasks = todosReducer.filter((todo) => todo.status === "taskDone");
  return (
    <Droppable droppableId="completed">
      {(provided) => (
        <div
          className="todoColumn"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3 style={{ marginTop: "10px" }}>Tasks Done</h3>
          <hr />

          {/* iterate the objects which has status 'completed' */}
          {tasks.map((todo, index) => (
            <SingleTodo key={todo.id} todo={todo} index={index}/>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Completed;
