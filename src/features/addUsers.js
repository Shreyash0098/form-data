import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  usersDetail: JSON.parse(localStorage.getItem("localSignupData")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || [],
};

export const usersSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userRecord = {
        id: nanoid(),
        userName: action.payload.userName,
        email: action.payload.email,
        pswd: action.payload.pswd,
        isLogedin: false,
      };
      state.usersDetail.push(userRecord);
      const localSignupData =
        JSON.parse(localStorage.getItem("localSignupData")) || [];
      localSignupData.push(userRecord);
      localStorage.setItem("localSignupData", JSON.stringify(localSignupData));
    },
    login: (state, action) => {
      const loginRecords = [...state.usersDetail];
      const userRecordIndex = loginRecords.findIndex(
        (data) => data.id === action.payload[0]?.id
      );
      loginRecords[userRecordIndex].isLogedin = true;
      state.usersDetail.splice(
        userRecordIndex,
        1,
        loginRecords[userRecordIndex]
      );
      localStorage.setItem("localSignupData", JSON.stringify(loginRecords));
      state.currentUser.push(loginRecords[userRecordIndex]);
      localStorage.setItem(
        "currentUser",
        JSON.stringify([loginRecords[userRecordIndex]])
      );
    },
    logout: (state, action) => {
      const loginRecords = [...state.usersDetail];
      const userRecordIndex = state.usersDetail.findIndex(
        (data) => data.id === action.payload[0]?.id
      );
      loginRecords[userRecordIndex].isLogedin = false;
      state.usersDetail.splice(
        userRecordIndex,
        1,
        loginRecords[userRecordIndex]
      );
      localStorage.setItem("localSignupData", JSON.stringify(loginRecords));
      state.currentUser = [];
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
});

export const { addUser, login, logout } = usersSlice.actions;
export default usersSlice.reducer;
