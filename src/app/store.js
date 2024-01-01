import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recordsSlice from "../features/submitRecords";
import usersSlice from "../features/addUsers";

export const store = configureStore({
  reducer: combineReducers({
    tableRecords: recordsSlice,
    userRecords: usersSlice,
  }),
});
