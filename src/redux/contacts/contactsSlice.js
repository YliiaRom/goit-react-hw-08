import { createAction, createSelector } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { selectNameFilter } from "../filters/selectors";
//  selectNameFilter

const handlePending = (state) => {
  state.loading = true;
};
const handleReject = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleReject)
      //add
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleReject)
      //del
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteContact.rejected, handleReject);
  },
});

export default slice.reducer;

// export const selectVisibleContacts = (state) => {
//   const contact = selectContacts(state);
//   const filterName = selectNameFilter(state);
//   if (!contact && filterName === "") {
//     return;
//   }
//   const contactsWidthFilter = contact.filter((el) =>
//     el.name.toLowerCase().includes(filterName.toLowerCase())
//   );
//   return contactsWidthFilter;
// };
