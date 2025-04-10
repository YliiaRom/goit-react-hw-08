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
} from "./redux/contacts/operations.js";
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
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const contacts = useSelector(selectContacts);
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <>
      {isRefreshing ? (
        <p>Please, wait ...... loading</p>
      ) : (
        <div>
          <AppBar />
          <hr />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegistrationPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={
                    <ContactsPage>
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
                  redirectTo="/login"
                />
              }
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
