import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasksReducer";

const store = configureStore({
  reducer: { tasks: tasksReducer },
});

export default store;
