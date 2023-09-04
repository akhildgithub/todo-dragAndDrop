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

import dayjs from "dayjs";
import { isEmpty, isNil } from "ramda";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomButton } from "../assets/styles/globalStyles";
import { useDispatch } from "react-redux";
import { add } from "../redux/todosReducer";

const CreateTask = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch((state) => state.todos);

  // add task details in task variable
  const [task, setTask] = React.useState({
    text: "",
    status: "todo",
    date: "",
  });

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

  // handling add of task
  const handleAdd = () => {
    if (
      !isNil(task.date) &&
      !isEmpty(task.date) &&
      !isEmpty(task.text) &&
      !isEmpty(task.status) &&
      !isNil(task.text) &&
      !isNil(task.status)
    ) {
      dispatch(add({ id: Date.now(), ...task }));
      handleClose();
    } else {
      alert("Enter all the fields which has * symbol");
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Create a Task for the team
        <hr />
      </DialogTitle>
      <DialogContent className="dialogContent">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* task */}
          Add task description*
          <textarea
            rows={5}
            autoFocus
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
            onChange={handleChange}
          />
          {/* task's status */}
          <FormControl>
            Select Task Status*
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              onChange={handleChange}
              defaultValue="todo"
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
                <DatePicker onChange={(e) => handleDateChange(e)} />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start" }}>
        {/* create task button */}
        <CustomButton background="create" onClick={() => handleAdd()}>
          Create task
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTask;
