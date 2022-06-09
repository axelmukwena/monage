import { createReducer } from "@reduxjs/toolkit";
import { updateTasks } from "../actions/tasksActions";

const initialState = { tasks: [] };

const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateTasks, (state, action) => {
    state.tasks = action.payload;
  });
});

export default tasksReducer;
