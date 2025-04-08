import { useState, useEffect } from "react";
import AppBar from "./components/AppBar/AppBar.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";

import users from "./contacts.json";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
  fetchContacts,
} from "./redux/contacts/contactsOps";
import Loader from "./components/Loader/Loader.jsx";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "./redux/contacts/selectors.js";
import HomePage from "./components/pages/HomePage/HomePage.jsx";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import ContactsPage from "./components/pages/ContactsPage/ContactsPage.jsx";
import { selectIsLoggedIn } from "./redux/auth/selectors.js";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchContacts());
    }
  }, [dispatch]);
  return (
    <>
      <AppBar />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <ContactsPage>
              {" "}
              <div>
                <h1>Phonebook</h1>
                <ContactForm />
                <SearchBox />
                {isLoading && !error && <Loader />}
                {error && <p style={{ fontSize: "40px" }}>{error}</p>}
                {contacts.length > 0 && <ContactList />}
              </div>
            </ContactsPage>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
