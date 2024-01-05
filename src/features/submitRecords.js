import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  records: JSON.parse(localStorage.getItem("localData")) || [],
  sortOrder: "asc",
};

export const recordsSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    addRecords: (state, action) => {
      const record = {
        id: nanoid(),
        lname: action.payload.lname,
        desc: action.payload.desc,
        country: action.payload.country,
      };
      state.records.push(record);
      const localData = JSON.parse(localStorage.getItem("localData")) || [];
      localData.push(record);
      localStorage.setItem("localData", JSON.stringify(localData));
    },
    deleteRecords: (state, action) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
    submitEditedRecords: (state, action) => {
      const index = state.records.findIndex(
        (el) => el.id === action.payload.id
      );
      const newData = [...state.records];
      newData.splice(index, 1, action.payload);
      state.records = newData;
    },
    sortRecords: (state, action) => {
      const sortedRecords = state.records.sort((a, b) => {
        const countryA = a.country.toLowerCase();
        const countryB = b.country.toLowerCase();

        if (state.sortOrder === "asc") {
          return countryA.localeCompare(countryB);
        } else {
          return countryB.localeCompare(countryA);
        }
      });

      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      // Update the formRecords with the sorted array
      state.records = [...sortedRecords];
    },
  },
});

export const { addRecords, deleteRecords, submitEditedRecords, sortRecords } =
  recordsSlice.actions;
export default recordsSlice.reducer;
