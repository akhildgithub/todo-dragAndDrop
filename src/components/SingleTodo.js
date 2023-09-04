import * as React from "react";
import UpdateTodo from "./UpdateTodo";
import "../App.css";
import { Draggable } from "react-beautiful-dnd";

export default function SingleTodo({ todo, index }) {
  const [open, setOpen] = React.useState(false);

  // open update dialog when needed
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        <Draggable draggableId={todo.id.toString()} index={index}>
          {(provided) => (
            <div
              className="card mb-3"
              onClick={handleClickOpen}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              key={todo.id}
            >

              {/* add the tasks data to the card */}
              <div className="card-body" >
                <p className="fs-6">{todo.text}</p>
                <p className="fs-6">
                  <b>Due date: </b>
                  {todo.date}
                </p>
              </div>
            </div>
          )}
        </Draggable>
      }
      
      {/* when open is true UpdateTodo Component is triggered */}
      {open && <UpdateTodo open={open} handleClose={handleClose} todo={todo} />}
    </>
  );
}
