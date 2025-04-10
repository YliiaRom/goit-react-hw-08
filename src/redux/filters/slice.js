import { createAction, createSelector } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});
export const { changeFilter } = slice.actions;
export default slice.reducer;

// export const selectVisibleContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );
