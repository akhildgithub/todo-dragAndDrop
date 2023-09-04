import React from "react";
import "../App.css";
import TaskToDo from "./TaskToDo";
import InProgress from "./InProgress";
import Completed from "./Completed";
import logo from "../assets/Akhil.png";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateMany } from "../redux/todosReducer";

const Todo = () => {
  const dispatch = useDispatch((state) => state.todos);
  const todosReducer = useSelector((state) => state.todos);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // console.log(source.droppableId, destination.droppableId);

    let todosArray = [];
    let inProgressArray = [];
    let completedArray = [];
    let combinedArray = [];

    // eslint-disable-next-line
    todosReducer.map((todo) => {
      if (todo.status === "todo") {
        todosArray.push(todo);
      } else if (todo.status === "inProgress") {
        inProgressArray.push(todo);
      } else if (todo.status === "taskDone") {
        completedArray.push(todo);
      }
    });

    // destionation cannot be null or undefined
    if (!destination) return;
    // check weather source and destination are same inculuding indexes
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // take out an source element from array
    let middle;
    switch (source.droppableId) {
      case "tasksTodo":
        middle = todosArray.slice(source.index, source.index + 1);
        todosArray = todosArray.filter((_, index) => index !== source.index);
        break;
      case "inProgress":
        middle = inProgressArray.slice(source.index, source.index + 1);
        inProgressArray = inProgressArray.filter(
          (_, index) => index !== source.index
        );
        break;
      case "completed":
        middle = completedArray.slice(source.index, source.index + 1);
        completedArray = completedArray.filter(
          (_, index) => index !== source.index
        );
        break;
      default:
        break;
    }

    // add the element which was taken out from source where it belongs
    switch (destination.droppableId) {
      case "tasksTodo":
        todosArray.splice(destination.index, 0, {
          ...middle[0],
          status: "todo",
        });
        combinedArray = todosArray.concat(inProgressArray, completedArray);
        break;
      case "inProgress":
        inProgressArray.splice(destination.index, 0, {
          ...middle[0],
          status: "inProgress",
        });
        combinedArray = inProgressArray.concat(todosArray, completedArray);
        break;
      case "completed":
        completedArray.splice(destination.index, 0, {
          ...middle[0],
          status: "taskDone",
        });
        combinedArray = completedArray.concat(inProgressArray, todosArray);
        break;
      default:
        break;
    }

    // update the array to redux store
    dispatch(updateMany(combinedArray));
  };

  return (
    <>
      {/* Normal Header with some logo */}
      <div
        className="header"
        style={{ display: "flex", marginLeft: 23, alignItems: "center" }}
      >
        <img src={logo} alt="logo" width="130px" />
        <div
          className="verticalLine"
          style={{ display: "inline-block", margin: "0 30px" }}
        ></div>
        <h2>Website Developer Tracker</h2>
      </div>

      {/* all the actions | The main part */}
      <div className="row">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskToDo />
          <InProgress />
          <Completed />
        </DragDropContext>
      </div>
    </>
  );
};

export default Todo;
