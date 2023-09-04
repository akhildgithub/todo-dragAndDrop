import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { isNil, isEmpty } from "ramda";
import { useDispatch } from "react-redux";
import { update, remove } from "../redux/todosReducer";
import { CustomButton } from "../assets/styles/globalStyles";

const UpdateTodo = ({ open, handleClose, todo }) => {
  const dispatch = useDispatch((state) => state.todos);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // get task details in task variable
  const [task, setTask] = React.useState(todo);

  // handling change of task and status
  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setTask({ ...task, [name]: value });
    }
  };

  // handling change of task due date
  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("MM/DD/YYYY");
    setTask({ ...task, date: formattedDate });
  };

  // handling update of task
  const handleUpdate = () => {
    if (
      !isNil(task.date) &&
      !isEmpty(task.date) &&
      !isEmpty(task.text) &&
      !isEmpty(task.status) &&
      !isNil(task.text) &&
      !isNil(task.status)
    ) {
      dispatch(update(task));
      handleClose();
    } else {
      alert("Enter all the fields which has * symbol");
    }
  };

  // handling delete of task
  const handleDelete = () => {
    dispatch(remove(todo.id));
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Edit the Task for the team
        <hr />
      </DialogTitle>
      <DialogContent className="dialogContent">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* task */}
          Add task description*
          <textarea
            rows={5}
            style={{
              background: "#dddddd",
              minHeight: "120px",
              maxHeight: "120px",
              overflowY: "auto",
              padding: "2px 5px",
              borderRadius: "10px",
              border: "0px",
            }}
            name="text"
            value={task.text}
            autoFocus
            onChange={handleChange}
          />
          {/* task's status */}
          <FormControl>
            Select Task Status*
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <FormControlLabel
                value="todo"
                control={<Radio />}
                label="To do"
              />
              <FormControlLabel
                value="inProgress"
                control={<Radio />}
                label="In progress"
              />
              <FormControlLabel
                value="taskDone"
                control={<Radio />}
                label="Task done"
              />
            </RadioGroup>
            {/* task's due date in MM/DD/YYYY format */}
            Due date*
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dayjs(task.date)}
                  onChange={(e) => handleDateChange(e)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        {/* update task button */}
        <CustomButton background="create" onClick={handleUpdate}>
          Update task
        </CustomButton>
        {/* delete task button */}
        <CustomButton background="delete" onClick={handleDelete}>
          Delete task
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTodo;
