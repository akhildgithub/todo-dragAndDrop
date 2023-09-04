import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1693749393254,
    text: "login page backend development and through testing.",
    status: "todo",
    date: "09/22/2023",
  },
  {
    id: 1693749393255,
    text: "login page backend development and through testing.",
    status: "todo",
    date: "09/27/2023",
  },
  {
    id: 1693749393256,
    text: "login page backend development and through testing.",
    status: "inProgress",
    date: "09/26/2023",
  },
  {
    id: 1693749393257,
    text: "login page backend development and through testing.",
    status: "taskDone",
    date: "09/28/2023",
  },
  {
    id: 1693749393258,
    text: "login page backend development and through testing.",
    status: "inProgress",
    date: "09/27/2023",
  },
  {
    id: 1693749393259,
    text: "login page backend development and through testing.",
    status: "inProgress",
    date: "09/28/2023",
  },
];
export const todosReducer = createSlice({
  name: "todosReducers",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    update(state, action) {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    updateMany(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { add, remove, update, updateMany } = todosReducer.actions;
export default todosReducer.reducer;
